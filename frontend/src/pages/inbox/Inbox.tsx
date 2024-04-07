import React from 'react'
import { COLORS } from '../../global/Colors'
import { chatsQuery } from './messageQueries';
import ChatCard from './components/ChatCard';

function Inbox() {

  const chats = chatsQuery();

  return (
    <div className='h-screen flex flex-col items-center overflow-y-scroll pb-20' style = {
      {
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
      }
    }>
      {
        chats.map((element) => {
          return (
            <ChatCard chat={element}/>
          )
        })
      }
    </div>
  )
}

export default Inbox