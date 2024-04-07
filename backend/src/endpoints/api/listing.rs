use crate::{
    endpoints::api::class::Class,
    endpoints::api::user::User,
    endpoints::api::want::{Want, WantType},
    endpoints::oauth::Claim,
    error::{ApiError, ApiResult},
};

use actix_web::{web, HttpMessage, HttpRequest, HttpResponse};
use chrono::{DateTime, NaiveDateTime, TimeZone, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{
    types::time::{OffsetDateTime, PrimitiveDateTime},
    PgPool, Row,
};

#[derive(sqlx::FromRow, Serialize)]
struct Listing {
    id: i32,
    poster: User,
    title: String,
    description: String,
    have_class: Class,
    want: Want,
    created_at: String,
}

#[derive(sqlx::FromRow)]
pub struct ListingRow {
    pub id: i32,
    pub user_id: String, // Renamed from `poster_id`
    pub username: Option<String>,
    pub email: String,
    pub profile_picture_url: Option<String>,
    pub title: String,
    pub description: String,
    pub class_id: i32,      // Renamed from `have_class_id`
    pub class_name: String, // Renamed from `have_class_name`
    pub department: String, // Renamed from `have_class_department`
    pub want_id: i32,
    pub want_type: WantType,
    pub want_class_id: i32,
    pub created_at: OffsetDateTime,
}

#[derive(Debug, Deserialize)]
pub struct CreateListingRequest {
    poster_id: String,
    title: String,
    description: String,
    have_id: i32,
    want_id: i32,
}

fn row_to_listing(row: ListingRow) -> Listing {
    Listing {
        id: row.id,
        poster: User {
            id: row.user_id.clone(),
            username: row.username,
            email: row.email,
            profile_picture_url: row.profile_picture_url,
        },
        title: row.title,
        description: row.description,
        have_class: Class {
            id: row.class_id,
            class_name: row.class_name,
            department: row.department,
        },
        want: Want {
            id: row.want_id,
            want_type: row.want_type,
            class_id: row.want_class_id,
            user_id: row.user_id.clone(),
        },
        created_at: row.created_at.to_string(),
    }
}

pub async fn get_listings(req: HttpRequest) -> ApiResult<HttpResponse> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let rows = sqlx::query_as!(
        ListingRow,
        r#"SELECT 
        listing.id as id, 
        users.id as user_id, 
        users.username as username, 
        users.email as email, 
        users.profile_picture_url as profile_picture_url,
        listing.title as title, 
        listing.description as description, 
        class.id as class_id, 
        class.class_name as class_name, 
        class.department as department, 
        want.id as want_id, 
        want.type as "want_type: _", 
        want.class_id as want_class_id,
        listing.created_at as created_at FROM listing INNER JOIN class ON class.id = have_id INNER JOIN want on want.id = want_id INNER JOIN users on poster_id = users.id"#
    )
        .fetch_all(pool)
        .await?;

    let listings = rows.into_iter().map(row_to_listing).collect::<Vec<_>>();

    Ok(HttpResponse::Ok().json(listings))
}

// #[get("/listings/{id}")]
pub async fn get_listing(req: HttpRequest, path: web::Path<i32>) -> ApiResult<HttpResponse> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let listing_id = path.into_inner();

    let row = sqlx::query_as!(
        ListingRow,
        r#"SELECT 
            listing.id as id, 
            users.id as user_id, 
            users.username as username, 
            users.email as email, 
            users.profile_picture_url as profile_picture_url,
            listing.title as title, 
            listing.description as description, 
            class.id as class_id, 
            class.class_name as class_name, 
            class.department as department, 
            want.id as want_id, 
            want.type as "want_type: _", 
            want.class_id as want_class_id,
            created_at
        FROM listing 
        INNER JOIN class ON class.id = have_id 
        INNER JOIN want ON want.id = want_id 
        INNER JOIN users ON poster_id = users.id 
        WHERE listing.id = $1"#,
        listing_id
    )
    .fetch_one(pool)
    .await?;

    let listing = row_to_listing(row);
    Ok(HttpResponse::Ok().json(listing))
}

// #[post("/listings")]
pub async fn create_listing(
    req: HttpRequest,
    body: web::Json<CreateListingRequest>,
) -> ApiResult<HttpResponse> {
    let extensions = req.extensions();

    let claim = extensions
        .get::<Claim>()
        .ok_or_else(ApiError::unauthorized)?;

    let CreateListingRequest {
        poster_id,
        title,
        description,
        have_id,
        want_id,
    } = body.into_inner();

    if poster_id != claim.sub {
        return Err(ApiError::unauthorized());
    }

    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    sqlx::query!(
        "INSERT INTO listing (poster_id, title, description, have_id, want_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        poster_id,
        title,
        description,
        have_id,
        want_id
    ).fetch_one(pool)
    .await?;

    Ok(HttpResponse::Created().json(""))
}
