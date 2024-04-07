import { COLORS } from '../../global/Colors'
import { TextButton } from '../../global/Buttons'
import Feed from '../../components/Feed/Feed'
import { useState } from 'react'
import Trending from '../../components/Trending/Trending'

const TAB_STATE_ENUM = {
  RECENTS: 0,
  TRENDING: 1
}

function Home() {

  const [tab, setTab] = useState(TAB_STATE_ENUM.RECENTS)

  return (
    <div className='flex flex-col items-center justify-start h-screen pt-4' style = {
      {
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
      }
    }>
      <div className='pb-4'>
        <TextButton text='Recents' onClick={() => {setTab(TAB_STATE_ENUM.RECENTS)}} className="mr-8"/>
        <TextButton text='Trending' onClick={() => {setTab(TAB_STATE_ENUM.TRENDING)}}/>
      </div>
      {
        tab == TAB_STATE_ENUM.RECENTS ? <Feed /> : <Trending />
      }
    </div>
  )
}

export default Home