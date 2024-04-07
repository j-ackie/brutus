import React from 'react'
import { Chat } from '../messageQueries'
import { Label, SubHeading } from '../../../global/Text'
import { COLORS } from '../../../global/Colors'

function ChatCard({chat} : {chat : Chat}) {

  // whoever is the destination user
  // for now just use user2

  let dest
  if(true){
    dest = chat.user2
  }
  else{
    dest = chat.user1
  }

  return (
    <div className="w-3/5 bg-white rounded-xl p-8 mt-4 flex flex-row items-center">

      <img src={chat.pfp} className="w-12 h-12 rounded-full border mr-4"/>

      <div className="">
        <SubHeading text={dest} color={COLORS.black}/>
        <Label text={chat.have ? "Desired" : "Offering"} color={chat.have? COLORS.accent : COLORS.accent2}/>
      </div>

    </div>
  )
}

export default ChatCard