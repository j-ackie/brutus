use crate::{
    endpoints::oauth::Claim,
    error::{ApiError, ApiResult},
};

use actix_web::{get, put, web, HttpMessage, HttpRequest, HttpResponse};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(sqlx::FromRow, Serialize)]
struct User {
    id: String,
    username: Option<String>,
    email: String,
    profile_picture_url: Option<String>,
}

#[derive(sqlx::FromRow, Deserialize)]
pub struct UpdateUserRequest {
    username: Option<String>,
    email: Option<String>,
    profile_picture_url: Option<String>,
}

// #[get("/users/{id}")]
pub async fn get_user(req: HttpRequest, path: web::Path<String>) -> ApiResult<HttpResponse> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let user_id = path.into_inner();

    let row = sqlx::query_as!(User, "SELECT * FROM users WHERE id = $1", user_id)
        .fetch_one(pool)
        .await?;

    Ok(HttpResponse::Ok().json(row))
}

// #[put("/users/{id}")]
pub async fn update_user(
    req: HttpRequest,
    path: web::Path<String>,
    body: web::Json<UpdateUserRequest>,
) -> ApiResult<HttpResponse> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    println!("{}", req.extensions().get::<Claim>().unwrap());

    let user_id = path.into_inner();

    let mut params = Vec::new();

    if let Some(username) = &body.username {
        params.push(format!("username = '{}'", username));
    }

    if let Some(email) = &body.email {
        params.push(format!("email = '{}'", email));
    }

    if let Some(profile_picture_url) = &body.profile_picture_url {
        params.push(format!("profile_picture_url = '{}'", profile_picture_url));
    }

    let query = format!(
        "UPDATE users SET {} WHERE id = $1 RETURNING *",
        params.join(", ")
    );

    let result = sqlx::query_as::<_, User>(&query)
        .bind(user_id)
        .fetch_one(pool)
        .await?;

    Ok(HttpResponse::Created().json(result))
}
