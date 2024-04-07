use crate::error::{ApiError, ApiResult};

use actix_web::{get, post, web, HttpRequest, HttpResponse};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(sqlx::FromRow, Serialize)]
struct Listing {
    id: i32,
    poster_id: String,
    title: String,
    description: String,
    have_id: i32,
    want_id: i32,
}

#[derive(Debug, Deserialize)]
pub struct CreateListingRequest {
    poster_id: String,
    title: String,
    description: String,
    have_id: i32,
    want_id: i32,
}

// #[get("/listings/{id}")]
pub async fn get_listing(req: HttpRequest, path: web::Path<i32>) -> ApiResult<HttpResponse> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let listing_id = path.into_inner();

    let row = sqlx::query_as!(Listing, "SELECT * FROM listing WHERE id = $1", listing_id)
        .fetch_one(pool)
        .await?;

    // return json of row
    Ok(HttpResponse::Ok().json(row))
}

// #[post("/listings")]
pub async fn create_listing(
    req: HttpRequest,
    body: web::Json<CreateListingRequest>,
) -> ApiResult<HttpResponse> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let CreateListingRequest {
        poster_id,
        title,
        description,
        have_id,
        want_id,
    } = body.into_inner();

    let result = sqlx::query_as!(
        Listing,
        "INSERT INTO listing (poster_id, title, description, have_id, want_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        poster_id,
        title,
        description,
        have_id,
        want_id
    ).fetch_one(pool)
    .await?;

    Ok(HttpResponse::Created().json(result))
}
