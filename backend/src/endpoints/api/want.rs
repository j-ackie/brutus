use actix_web::{web, HttpMessage, HttpRequest, HttpResponse};
use serde::{Deserialize, Serialize};

use sqlx::PgPool;

use crate::{
    endpoints::oauth::Claim,
    error::{ApiError, ApiResult},
};

#[derive(sqlx::Type, Debug, Serialize, Deserialize)]
#[sqlx(rename_all = "lowercase")]
#[sqlx(type_name = "want_type")]
enum WantType {
    #[serde(rename = "class")]
    Class,
    #[serde(rename = "category")]
    Category,
    #[serde(rename = "department")]
    Department,
}

#[derive(sqlx::FromRow, Serialize)]
struct Want {
    id: i32,
    want_type: WantType,
    class_id: i32,
    user_id: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateWantRequest {
    want_type: WantType,
    class_id: i32,
    user_id: String,
}

pub async fn create_want(
    req: HttpRequest,
    body: web::Json<CreateWantRequest>,
) -> ApiResult<HttpResponse> {
    let extensions = req.extensions();

    let claim = extensions
        .get::<Claim>()
        .ok_or_else(ApiError::unauthorized)?;

    if body.user_id != claim.sub {
        return Err(ApiError::unauthorized());
    }

    let CreateWantRequest {
        want_type,
        class_id,
        user_id,
    } = body.into_inner();

    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let result = sqlx::query_as!(
        Want,
        r#"INSERT INTO want (type, class_id, user_id) VALUES ($1, $2, $3) RETURNING id, type as "want_type: _", class_id, user_id"#,
        want_type as WantType,
        class_id,
        user_id
    )
    .fetch_one(pool)
    .await?;

    Ok(HttpResponse::Created().json(result))
}
