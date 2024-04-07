use actix_web::{web, HttpMessage, HttpRequest, HttpResponse};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

use crate::{
    endpoints::oauth::Claim,
    error::{ApiError, ApiResult},
};

#[derive(sqlx::FromRow, Serialize)]
struct Drop {
    id: i32,
    class_id: i32,
    user_id: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateDropRequest {
    class_id: i32,
    user_id: String,
}

pub async fn create_drop(
    req: HttpRequest,
    body: web::Json<CreateDropRequest>,
) -> ApiResult<HttpResponse> {
    let extensions = req.extensions();

    let claim = extensions
        .get::<Claim>()
        .ok_or_else(ApiError::unauthorized)?;

    if body.user_id != claim.sub {
        return Err(ApiError::unauthorized());
    }

    let CreateDropRequest { class_id, user_id } = body.into_inner();

    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let result = sqlx::query_as!(
        Drop,
        "INSERT INTO class_drop (class_id, user_id) VALUES ($1, $2) RETURNING id, class_id, user_id",
        class_id,
        user_id
    )
    .fetch_one(pool)
    .await?;

    Ok(HttpResponse::Created().json(result))
}
