use serde::Serialize;

#[derive(sqlx::FromRow, Serialize)]
pub struct Class {
    pub id: i32,
    pub class_name: String,
    pub department: String,
}
