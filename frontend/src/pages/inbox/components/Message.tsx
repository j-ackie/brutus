import React from 'react'
import { RegText, SubHeading } from '../../../global/Text'
import { MessageType } from '../messageQueries'

function Message({message} : {message : MessageType}) {
  return (
    <div>
      <SubHeading text={message.name}/>
      <RegText text={message.message}/>
    </div>
  )
}

export default Message