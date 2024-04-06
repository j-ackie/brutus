use actix_web::http::StatusCode;
use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer, Responder, ResponseError};
use dotenv::dotenv;
use serde::Serialize;
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::env;

const SCHEMA: &str = r#"
CREATE TABLE IF NOT EXISTS User (
    id integer PRIMARY KEY,
    name text NOT NULL
);
"#;

#[derive(Serialize, Debug)]
struct ApiError {
    #[serde(skip_serializing)]
    error_code: StatusCode,
    message: String,
}

impl ApiError {
    fn internal_error(message: impl std::fmt::Display) -> Self {
        Self {
            error_code: StatusCode::INTERNAL_SERVER_ERROR,
            message: message.to_string(),
        }
    }
}

impl std::fmt::Display for ApiError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.error_code).json(self) // Serialize self as JSON for the error response body
    }
}

#[get("/hello/{name}")]
async fn greet(name: web::Path<String>) -> impl Responder {
    format!("Hello {name}!")
}

#[get("/")]
async fn index(req: HttpRequest) -> Result<String, ApiError> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(|| ApiError::internal_error("No pool found"))?;

    let rows = sqlx::query!("SELECT (id) FROM testing")
        .fetch_all(pool)
        .await
        .map_err(|e| ApiError::internal_error(e.to_string()))?;

    let mut out = String::new();

    for row in rows {
        out.push_str(&format!("id: {}\n", row.id.unwrap()));
    }

    Ok(out)
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

    sqlx::query(SCHEMA)
        .execute(&pool)
        .await
        .expect("Failed to initialize database schema");

    HttpServer::new(move || {
        App::new()
            .app_data(pool.clone())
            .service(greet)
            .service(index)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
