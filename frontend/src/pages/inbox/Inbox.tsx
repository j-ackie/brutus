import React, { useState } from 'react'
import { COLORS } from '../../global/Colors'
import { chatsQuery } from './messageQueries';
import ChatCard from './components/ChatCard';
import ChatDisplay from './components/ChatDisplay';
import { RegText } from '../../global/Text';

function Inbox() {

  const chats = chatsQuery();

  const [selected, setSelected] = useState(-1)

  return (
    <div className='h-screen flex flex-row pb-20' style = {
      {
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
      }
    }>
      <div className='h-full flex flex-col items-center overflow-y-scroll flex-1'>
      {
        chats.map((element, i) => {
          return (
            <ChatCard chat={element} onClick={() => {
              setSelected(i)
            }}/>
          )
        })
      }
      </div>

      <div className='flex-1'>
        {selected == -1 ? <RegText text='Select a chat...'/> : <ChatDisplay id={chats[selected].chatid}/>}
      </div>
    </div>
  )
}

export default Inbox