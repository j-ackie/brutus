use std::{cell::RefCell, collections::HashMap, rc::Rc};

use actix::{
    prelude::ContextFutureSpawner, Actor, Context, Handler, Message, Recipient, ResponseFuture,
    WrapFuture,
};
use actix_web::web::Data;
use sqlx::PgPool;

use super::session;

// chat server manages chat rooms and responsible for coordinating chat session
#[derive(Debug, Clone)]
pub struct ChatServer {
    sessions: Rc<RefCell<HashMap<String, (Recipient<session::ChatMessageToClient>, Option<i32>)>>>, // maps session id to session address and the room id the session is in
    // rooms: Rc<RefCell<HashMap<i32, HashSet<i32>>>>, // maps room id to set of session ids in the room
    // we don't need rooms because we only have DM and no group chat
    pool: Data<PgPool>,
}

/// Make actor from `ChatServer`
impl Actor for ChatServer {
    /// We are going to use simple Context, we just need ability to communicate
    /// with other actors.
    type Context = Context<Self>;
}

impl ChatServer {
    pub fn new(pool: Data<PgPool>) -> ChatServer {
        ChatServer {
            sessions: Rc::new(RefCell::new(HashMap::new())),
            // rooms: Rc::new(RefCell::new(HashMap::new())),
            pool,
        }
    }
}
// chat message to server

#[derive(Message, Clone)]
#[rtype(result = "()")]
pub struct ChatMessageToServer {
    pub sender_id: String,
    pub receiver_id: String,
    pub chat_id: i32,
    pub content: String,
}

impl Handler<ChatMessageToServer> for ChatServer {
    type Result = ();

    fn handle(&mut self, msg: ChatMessageToServer, ctx: &mut Self::Context) -> Self::Result {
        let sessions = self.sessions.borrow();

        match sessions.get(&msg.receiver_id) {
            Some((addr, _)) => {
                addr.do_send(session::ChatMessageToClient(msg.content.clone()));
            }
            None => {
                println!("Session with id {} isn't registered on chat server. Message not sent over websocket.", msg.receiver_id);
            }
        }

        // let pool = self.pool.clone();
        async move {
            // let result = chat_repository::insert_chat_message(
            //     msg.sender_id,
            //     msg.chat_id,
            //     &msg.content,
            //     pool.as_ref(),
            // )
            // .await;

            // match result {
            //     Ok(_) => {
            //         println!("Message inserted to database successfully");
            //         match chat_repository::increment_unread_count_based_on_sender_id(
            //             msg.chat_id ,
            //             msg.sender_id ,
            //             pool.as_ref(),
            //         ).await {
            //             Ok(_) => {
            //                 println!("Unread count incremented successfully");
            //                 match chat_repository::get_other_user_push_token(msg.sender_id , msg.chat_id , pool.as_ref()).await {
            //                     Ok(Some(push_token)) => {
            //                         println!("Push token fetched successfully");
            //                         let request = notification::request::PostNotificationRequest {
            //                             to: push_token,
            //                             title: "New Message".to_string(),
            //                             body: msg.content,
            //                         };
            //                         match notification::request::request_send_notifcation(
            //                             &request,
            //                         )
            //                         .await
            //                         {
            //                             Ok(resp_msg) => {
            //                                 println!("Push notification sent successfully {resp_msg}")
            //                             }
            //                             Err(err) => {
            //                                 println!("Failed to send push notification. Error message: {err}");
            //                             }
            //                         }
            //                     }
            //                     Ok(None) => {
            //                         println!("Push token not found");
            //                     }
            //                     Err(err) => {
            //                         println!("Failed to fetch push token. Error message: {err}");
            //                     }
            //                 }

            //             }
            //             Err(err) => {
            //                 println!("Failed to increment unread count. Error message: {err}");
            //             }
            //         }
            //     }
            //     Err(err) => {
            //         println!("Failed to insert message to databse. Error message: {err}");
            //     }
            // }
        }
        .into_actor(self)
        .spawn(ctx);
    }
}

//  new chat session is created
#[derive(Message)]
#[rtype(result = "()")]
pub struct Connect {
    pub user_id: String,
    pub addr: Recipient<session::ChatMessageToClient>,
}

impl Handler<Connect> for ChatServer {
    type Result = ();

    fn handle(&mut self, msg: Connect, _: &mut Self::Context) -> Self::Result {
        // create a session id using the user_id and add to sessions

        self.sessions
            .borrow_mut()
            .insert(msg.user_id, (msg.addr, None));
    }
}

//  session is disconnected
#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub user_id: String,
}

impl Handler<Disconnect> for ChatServer {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, _: &mut Self::Context) -> Self::Result {
        println!("Session with id {} disconnected", msg.user_id);

        let mut sessions = self.sessions.borrow_mut();
        // let mut rooms = self.rooms.borrow_mut();

        match sessions.remove(&msg.user_id) {
            Some((_, _)) => (), // if session is not in a room, do nothing
            None => {
                println!("Session with id {} does not exist", msg.user_id);
            }
        }
    }
}

//  session is disconnected #[derive(Message)]
#[derive(Clone)]
pub struct Join {
    pub user_id: String,
    pub chat_id: i32,
}

impl actix::Message for Join {
    type Result = Result<String, String>;
}

impl Handler<Join> for ChatServer {
    type Result = ResponseFuture<Result<String, String>>;

    fn handle(&mut self, msg: Join, _: &mut Self::Context) -> Self::Result {
        let pool = self.pool.clone();

        // let rooms = self.rooms.clone();
        let sessions = self.sessions.clone();

        // do something async
        Box::pin(async move {
            let record = sqlx::query!(
                r#"
                SELECT listing.poster_id, chat.other_party_id
                FROM chat
                JOIN listing ON chat.listing_id = listing.id
                WHERE chat.id = $1 AND (listing.poster_id = $2 OR chat.other_party_id = $3)
                "#,
                msg.chat_id,
                msg.user_id,
                msg.user_id,
            )
            .fetch_one(pool.as_ref())
            .await;

            println!("got record with {record:?}");

            let is_part_of_chat_group = match record {
                Err(sqlx::Error::RowNotFound) => Ok(None),
                Err(err) => Err(err),
                Ok(users_in_chat) => {
                    if users_in_chat.poster_id == msg.user_id {
                        Ok(Some(users_in_chat.other_party_id))
                    } else if users_in_chat.other_party_id == msg.user_id {
                        Ok(Some(users_in_chat.poster_id))
                    } else {
                        Ok(None)
                    }
                }
            };

            match is_part_of_chat_group {
                Ok(is_part_of_chat_group) => match is_part_of_chat_group {
                    Some(other_user_id) => {
                        let mut sessions = sessions.borrow_mut();
                        println!(
                            "user {} is part of chat group {} ",
                            msg.user_id, msg.chat_id
                        );

                        match sessions.get_mut(&msg.user_id) {
                            Some((_, room_id)) => {
                                *room_id = Some(msg.chat_id);
                                //     match crate::repository::chat_repository::clear_unread_count_by_user_id(
                                //         msg.user_id ,
                                //         msg.chat_id ,
                                //         pool.as_ref(),
                                //     ).await {
                                //         Ok(_) => {
                                //             println!("Unread count cleared successfully");
                                //         }
                                //         Err(err) => {
                                //             println!(
                                //                 "Failed to clear unread count. Error message: {}\n",
                                //                 err
                                //             );

                                //             Err(format!(
                                //                 "Failed to clear unread count: {}\n",
                                //                 err
                                //             ))?;
                                //         }
                                //     }
                            }
                            None => {
                                println!("Session with id {} does not exist", msg.user_id);

                                Err(format!("Session with id {} does not exist", msg.user_id))?;
                            }
                        }

                        Ok(other_user_id)
                    }

                    None => {
                        println!(
                            "user {} is not part of chat group {} ",
                            msg.user_id, msg.chat_id
                        );

                        Err("You are not part of this chat group".to_string())
                    }
                },
                Err(err) => {
                    println!(
                        "Error checking if user is part of chat group: Error message: {err}\n",
                    );

                    Err(format!(
                        "Failed to check if user is part of chat group: {}\n",
                        err
                    ))
                }
            }
        })
    }
}
