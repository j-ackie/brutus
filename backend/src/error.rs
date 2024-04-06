use actix_web::{HttpResponse, ResponseError};
use oauth2::http::StatusCode;
use serde::Serialize;

pub type ApiResult<T> = Result<T, ApiError>;

#[derive(Serialize, Debug)]
pub struct ApiError {
    #[serde(skip_serializing)]
    error_code: StatusCode,
    message: String,
}

impl From<sqlx::Error> for ApiError {
    fn from(e: sqlx::Error) -> Self {
        match e {
            sqlx::Error::RowNotFound => ApiError::not_found(e.to_string()),
            _ => ApiError::internal_error(e.to_string()),
        }
    }
}

impl ApiError {
    pub fn internal_error(message: impl std::fmt::Display) -> Self {
        Self {
            error_code: StatusCode::INTERNAL_SERVER_ERROR,
            message: message.to_string(),
        }
    }

    pub fn not_found(message: impl std::fmt::Display) -> Self {
        Self {
            error_code: StatusCode::NOT_FOUND,
            message: message.to_string(),
        }
    }

    pub fn missing_pool_error() -> Self {
        Self::internal_error("No pool found")
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
