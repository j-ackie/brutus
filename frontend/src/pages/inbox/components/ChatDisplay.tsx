import React, { useState } from 'react'
import { getMessagesFromChatId } from '../messageQueries'
import Message from './Message'
import Input from '../../../global/Input'

function ChatDisplay({id} : {id : number}) {

  const messages = getMessagesFromChatId(id)

  const [currMsg, setCurrMsg] = useState("")

  return (
    <div className='flex flex-col h-full'>
      Now displaying: {id}

      <div className='flex-grow overflow-y-scroll'>
        {
        messages.map(msg => <Message message={msg}/>)
        }
      </div>

      <Input 
        type='text' 
        value={currMsg} 
        name='msg'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrMsg(e.target.value)}
        className="w-4/5"
      />
    </div>
  )
}

export default ChatDisplay