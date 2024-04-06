mod endpoints;
mod error;

use actix_web::{get, web, App, HttpRequest, HttpServer, Responder};
use dotenv::dotenv;
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::env;

use crate::error::ApiError;

const TABLES: [&str; 4] = [
    "CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    email TEXT NOT NULL,
    profile_picture_url TEXT
);",
    "CREATE TABLE IF NOT EXISTS class (
    id INTEGER PRIMARY KEY,
    class_name TEXT NOT NULL,
    department TEXT NOT NULL
);",
    "
CREATE TABLE IF NOT EXISTS want (
    id INTEGER PRIMARY KEY,
    type want_type NOT NULL,
    class_id INTEGER REFERENCES class(id) 
);",
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

// #[get("/hello/{name}")]
// async fn greet(name: web::Path<String>) -> impl Responder {
//     format!("Hello {name}!")
// }

// #[get("/")]
// async fn index(req: HttpRequest) -> Result<String, ApiError> {
//     // let pool = req
//     //     .app_data::<PgPool>()
//     //     .ok_or_else(|| ApiError::missing_pool_error())?;

//     // let rows = sqlx::query!("SELECT (id) FROM testing")
//     //     .fetch_all(pool)
//     //     .await
//     //     .map_err(|e| ApiError::internal_error(e.to_string()))?;

//     // let mut out = String::new();

//     // for row in rows {
//     //     out.push_str(&format!("id: {}\n", row.id.unwrap()));
//     // }

//     // Ok(out)
//     Ok(String::from("Hello world!"))
// }

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
        App::new()
            .app_data(pool.clone())
            // .service(greet)
            // .service(index)
            .service(endpoints::api::get_listing)
            .service(endpoints::api::create_listing)
            .service(endpoints::oauth::redirect)
            .service(endpoints::oauth::callback)
    })
    .bind("127.0.0.1:8080")?
    .bind("[::1]:8080")?
    // .bind("[::1]:8080")?
    .run()
    .await
}
