import React from 'react'
import { getMessagesFromChatId } from '../messageQueries'
import Message from './Message'

function ChatDisplay({id} : {id : number}) {

  const messages = getMessagesFromChatId(id)

  return (
    <div>
      Now displaying: {id}

      {
      messages.map(msg => <Message message={msg}/>)
      }
    </div>
  )
}

export default ChatDisplay