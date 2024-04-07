use actix_web::{web, HttpRequest, HttpResponse, Responder};
use chrono::{Duration, Utc};
use core::fmt;
use jsonwebtoken::{encode, EncodingKey, Header};
use oauth2::basic::BasicClient;
use oauth2::{
    AuthUrl, AuthorizationCode, ClientId, ClientSecret, CsrfToken, RedirectUrl, Scope,
    TokenResponse, TokenUrl,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::collections::HashMap;
use std::env;

use crate::error::{ApiError, ApiResult};

#[derive(Serialize, Deserialize)]
struct UserInfo {
    id: String,
    email: String,
    picture: String,
}

async fn get_user_info(access_token: &str) -> Result<UserInfo, reqwest::Error> {
    let client = reqwest::Client::new();
    // The URL might change based on Google's API documentation.
    let user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo";

    let response = client
        .get(user_info_url)
        .bearer_auth(access_token)
        .send()
        .await?
        .json::<UserInfo>()
        .await?;

    Ok(response)
}

fn get_google_oauth_client() -> Result<BasicClient, Box<dyn std::error::Error>> {
    Ok(BasicClient::new(
        ClientId::new(env::var("GOOGLE_CLIENT_ID")?),
        Some(ClientSecret::new(env::var("GOOGLE_CLIENT_SECRET")?)),
        AuthUrl::new("https://accounts.google.com/o/oauth2/v2/auth".to_string())?,
        Some(TokenUrl::new(
            "https://www.googleapis.com/oauth2/v4/token".to_string(),
        )?),
    )
    .set_redirect_uri(RedirectUrl::new(
        "http://localhost:8080/oauth/callback".to_string(),
    )?))
}
// #[get("/oauth/redirect")]
pub async fn redirect() -> ApiResult<HttpResponse> {
    let google_oauth_client = get_google_oauth_client().map_err(ApiError::internal_error)?;
    let (auth_url, _csrf_token) = google_oauth_client
        .authorize_url(CsrfToken::new_random)
        .add_scope(Scope::new(
            "https://www.googleapis.com/auth/userinfo.email".to_string(),
        ))
        .url();

    Ok(HttpResponse::Found()
        .append_header(("Location", auth_url.to_string()))
        .finish())
}

#[derive(Serialize, Deserialize)]
pub struct Claim {
    pub sub: String,
    pub exp: usize,
    pub email: String,
}

impl fmt::Display for Claim {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "sub: {}, exp: {}, email: {}",
            self.sub, self.exp, self.email
        )
    }
}

// #[get("/oauth/callback")]
pub async fn callback(
    req: HttpRequest,
    query: web::Query<HashMap<String, String>>,
) -> ApiResult<impl Responder> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let code = query.get("code").expect("No code provided");
    let google_oauth_client = get_google_oauth_client().unwrap();
    let token = google_oauth_client
        .exchange_code(AuthorizationCode::new(code.to_string()))
        .request_async(oauth2::reqwest::async_http_client)
        .await
        .expect("Failed to exchange code for token");

    let user_info = get_user_info(token.access_token().secret())
        .await
        .expect("Failed to get user info");

    let maybe_user = sqlx::query!("SELECT (id) FROM users WHERE id = $1", user_info.id)
        .fetch_one(pool)
        .await;

    if maybe_user.is_err() {
        sqlx::query!(
            "INSERT INTO users (id, email, profile_picture_url) VALUES ($1, $2, $3)",
            user_info.id,
            user_info.email,
            user_info.picture
        )
        .execute(pool)
        .await
        .expect("Failed to insert user info");
    }

    let expiration = Utc::now()
        .checked_add_signed(Duration::days(1))
        .expect("valid timestamp")
        .timestamp();

    let claim = Claim {
        sub: user_info.id,
        exp: expiration as usize,
        email: user_info.email,
    };

    let secret_key = env::var("JWT_SECRET_KEY").expect("JWT_SECRET_KEY must be set");
    let token = encode(
        &Header::default(),
        &claim,
        &EncodingKey::from_secret(secret_key.as_ref()),
    )
    .expect("Failed to encode token");

    Ok(HttpResponse::SeeOther()
        .append_header(("Location", "/"))
        .json(token))
}
