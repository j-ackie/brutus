use crate::{
    endpoints::api::class::Class,
    endpoints::api::listing::Listing,
    endpoints::api::user::User,
    endpoints::api::want::{Want, WantType},
};

use actix_web::{web, HttpMessage, HttpRequest, HttpResponse};
use serde::{Deserialize, Serialize};
use sqlx::{types::time::OffsetDateTime, PgPool, Row};

use crate::{
    endpoints::oauth::Claim,
    error::{ApiError, ApiResult},
};

#[derive(Serialize)]
struct Chat {
    id: i32,
    listing: Listing,
    other_user: User,
}

#[derive(Deserialize)]
pub struct Info {
    user_id: String,
}

#[derive(sqlx::FromRow)]
pub struct ChatRow {
    pub id: i32,
    pub listing_id: i32,
    pub poster_id: String,
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
    pub other_party_id: String,
    pub other_party_username: Option<String>,
    pub other_party_email: String,
    pub other_party_profile_picture_url: Option<String>,
}

fn row_to_chat(row: ChatRow) -> Chat {
    Chat {
        id: row.id,
        listing: Listing {
            id: row.listing_id,
            poster: User {
                id: row.poster_id.clone(),
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
                user_id: row.poster_id.clone(),
            },
            created_at: row.created_at.to_string(),
        },
        other_user: User {
            id: row.other_party_id,
            username: row.other_party_username,
            email: row.other_party_email,
            profile_picture_url: row.other_party_profile_picture_url,
        },
    }
}

pub async fn get_chats(req: HttpRequest, info: web::Query<Info>) -> ApiResult<HttpResponse> {
    let pool = req
        .app_data::<PgPool>()
        .ok_or_else(ApiError::missing_pool_error)?;

    let user_id = info.user_id.clone();

    let extensions = req.extensions();

    let claim = extensions
        .get::<Claim>()
        .ok_or_else(ApiError::unauthorized)?;

    println!("{}", claim.sub);
    if user_id != claim.sub {
        return Err(ApiError::unauthorized());
    }

    let rows = sqlx::query_as!(
        ChatRow,
        r#"SELECT
            chat.id as id,
            listing.id as listing_id,
            listing.poster_id as poster_id,
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
            listing.created_at as created_at,
            chat.other_party_id as other_party_id,
            m.username as other_party_username,
            m.email as other_party_email,
            m.profile_picture_url as other_party_profile_picture_url
      FROM chat 
      INNER JOIN listing ON listing.id = chat.listing_id 
      INNER JOIN users on listing.poster_id = users.id
      INNER JOIN users m on chat.other_party_id = users.id
      INNER JOIN class on class.id = listing.have_id
      INNER JOIN want on want.id = listing.want_id
      WHERE other_party_id = $1 OR users.id = $2"#,
        user_id,
        user_id
    )
    .fetch_all(pool)
    .await?;

    let chats = rows.into_iter().map(row_to_chat).collect::<Vec<_>>();

    Ok(HttpResponse::Ok().json(chats))
}
