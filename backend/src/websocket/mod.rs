pub mod server;
pub mod session;

use std::time::Instant;

use actix::Addr;
use actix_web::{
    get,
    web::{Data, Payload},
    Error, HttpMessage, HttpRequest, HttpResponse,
};
use actix_web_actors::ws;

use crate::{endpoints::oauth::Claim, error::ApiError};

#[get("/ws")]
async fn ws_route(
    req: HttpRequest,
    stream: Payload,
    srv: Data<Addr<server::ChatServer>>,
) -> Result<HttpResponse, Error> {
    let mut extensions = req.extensions_mut();
    let claim = extensions
        .get_mut::<Claim>()
        .ok_or_else(ApiError::unauthorized)?;

    ws::start(
        session::WsChatSession {
            user_id: std::mem::take(&mut claim.sub),
            hb: Instant::now(),
            chat_id_and_other_user_id: None,
            server_addr: srv.get_ref().clone(),
        },
        &req,
        stream,
    )
}
