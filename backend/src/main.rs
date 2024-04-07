mod endpoints;
mod error;
mod websocket;

use actix::Actor;
use actix_cors::Cors;
use actix_web::dev::ServiceRequest;
use actix_web::error::ErrorInternalServerError;
use actix_web::web::Data;
use actix_web::{web, App, Error, HttpMessage, HttpServer, Responder};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web_httpauth::middleware::HttpAuthentication;

use dotenv::dotenv;
use endpoints::oauth::Claim;
use jsonwebtoken::{decode, DecodingKey, Validation};
use sqlx::postgres::PgPoolOptions;
use std::env;

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

async fn index() -> impl Responder {
    actix_files::NamedFile::open("./build/index.html")
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

    // // run the migration
    // sqlx::migrate!("./migrations")
    //     .run(&pool)
    //     .await
    //     .expect("Failed to migrate");

    let server = websocket::server::ChatServer::new(Data::new(pool.clone())).start();

    HttpServer::new(move || {
        let auth = HttpAuthentication::bearer(validator);

        App::new()
            .app_data(pool.clone())
            .app_data(Data::new(server.clone()))
            .wrap(Cors::permissive())
            .route(
                "/listings",
                web::get().to(endpoints::api::listing::get_listings),
            )
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
            .route(
                "/chats",
                web::get()
                    .to(endpoints::api::chat::get_chats)
                    .wrap(auth.clone()),
            )
            .route("/oauth/redirect", web::get().to(endpoints::oauth::redirect))
            .route("/oauth/callback", web::get().to(endpoints::oauth::callback))
            .service(websocket::ws_route)
            .service(actix_files::Files::new("/static", "./build/static").show_files_listing())
            .default_service(web::route().to(index))
    })
    .workers(2)
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
