use actix_web::{HttpRequest, HttpResponse};
use serde::Serialize;
use sqlx::PgPool;

use crate::error::{ApiError, ApiResult};

#[derive(sqlx::FromRow, Serialize)]
struct Class {
    id: i32,
    class_name: String,
    department: String,
    want_count: Option<i64>,
    drop_count: Option<i64>,
}

pub async fn get_trending(req: HttpRequest) -> ApiResult<HttpResponse> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let rows = sqlx::query_as!(
        Class,
        "
        SELECT c.id, c.class_name, c.department, c.want_count, COUNT(drop.class_id) AS drop_count FROM (
        SELECT class.id as id, class_name, department, COUNT(*) as want_count FROM want INNER JOIN class ON class.id = class_id GROUP BY class.id ORDER BY want_count DESC LIMIT 10
        ) as c 
        LEFT JOIN drop ON drop.class_id = c.id 
        GROUP BY c.id, c.class_name, c.department, c.want_count;
        "
    )
    .fetch_all(pool)
    .await?;

    Ok(HttpResponse::Ok().json(rows))
}
