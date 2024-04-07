pub mod server;
pub mod session;

use std::time::Instant;

use actix::Addr;
use actix_web::{
    get,
    web::{self, Data, Payload},
    Error, HttpRequest, HttpResponse,
};
use actix_web_actors::ws;

#[get("/ws/{uid}")]
async fn ws_route(
    req: HttpRequest,
    stream: Payload,
    srv: Data<Addr<server::ChatServer>>,
    path: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let user_id = path.into_inner();
    println!("hello from here");
    println!("uid: {user_id}");
    // let user_id = String::from("113904688673187085934");

    ws::start(
        session::WsChatSession {
            user_id,
            hb: Instant::now(),
            chat_id_and_other_user_id: None,
            server_addr: srv.get_ref().clone(),
        },
        &req,
        stream,
    )
}
