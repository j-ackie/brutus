mod endpoints;
mod error;

use actix_web::dev::ServiceRequest;
use actix_web::error::ErrorInternalServerError;
use actix_web::{get, web, App, Error, HttpMessage, HttpRequest, HttpServer, Responder};
use actix_web_httpauth::extractors::bearer::{BearerAuth, Config};
use actix_web_httpauth::middleware::HttpAuthentication;
use dotenv::dotenv;
use jsonwebtoken::{decode, DecodingKey, Validation};
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::env;

use crate::endpoints::oauth::Claim;
use crate::error::ApiError;

const TABLES: [&str; 5] = [
    "CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    email TEXT NOT NULL,
    profile_picture_url TEXT
);",
    "CREATE TABLE IF NOT EXISTS class (
    id SERIAL PRIMARY KEY,
    class_name TEXT NOT NULL,
    department TEXT NOT NULL
);",
    "
    CREATE TABLE IF NOT EXISTS want (
        id SERIAL PRIMARY KEY,
        type want_type NOT NULL,
        class_id INTEGER REFERENCES class(id) NOT NULL,
        user_id TEXT REFERENCES users(id) NOT NULL
    );",
    "CREATE TABLE IF NOT EXISTS drop (
        id SERIAL PRIMARY KEY,
        class_id INTEGER REFERENCES class(id) NOT NULL,
        user_id TEXT REFERENCES users(id) NOT NULL
    );
",
    "
CREATE TABLE IF NOT EXISTS listing (
    id SERIAL PRIMARY KEY,
    poster_id TEXT NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    have_id INTEGER NOT NULL REFERENCES class(id),
    want_id INTEGER NOT NULL REFERENCES want(id)
);",
];

async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    let secret_key = env::var("JWT_SECRET_KEY").expect("JWT_SECRET_KEY must be set");
    let token_message = decode::<Claim>(
        credentials.token(),
        &DecodingKey::from_secret(secret_key.as_ref()),
        &Validation::new(jsonwebtoken::Algorithm::HS256),
    );

    if let Err(e) = token_message {
        return Err((ErrorInternalServerError(e.to_string()), req));
    }

    let claim = token_message.unwrap().claims;
    req.extensions_mut().insert(claim);
    Ok(req)
}

async fn initialize_tables(pool: &PgPool) -> Result<(), sqlx::Error> {
    for table in TABLES {
        sqlx::query(table).execute(pool).await?;
    }
    Ok(())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Failed to create pool");

    initialize_tables(&pool)
        .await
        .expect("Failed to initialize tables");

    HttpServer::new(move || {
        let auth = HttpAuthentication::bearer(validator);

        App::new()
            .app_data(pool.clone())
            .route(
                "/listings/{id}",
                web::get().to(endpoints::api::listing::get_listing),
            )
            .route(
                "/listings",
                web::post()
                    .to(endpoints::api::listing::create_listing)
                    .wrap(auth.clone()),
            )
            .route("/users/{id}", web::get().to(endpoints::api::user::get_user))
            .route(
                "/users/{id}",
                web::put()
                    .to(endpoints::api::user::update_user)
                    .wrap(auth.clone()),
            )
            .route(
                "/trending",
                web::get().to(endpoints::api::trending::get_trending),
            )
            .route(
                "/want",
                web::post()
                    .to(endpoints::api::want::create_want)
                    .wrap(auth.clone()),
            )
            .route(
                "/drop",
                web::post()
                    .to(endpoints::api::drop::create_drop)
                    .wrap(auth.clone()),
            )
            .route("/oauth/redirect", web::get().to(endpoints::oauth::redirect))
            .route("/oauth/callback", web::get().to(endpoints::oauth::callback))
    })
    .bind("127.0.0.1:8080")?
    .bind("[::1]:8080")?
    // .bind("[::1]:8080")?
    .run()
    .await
}
