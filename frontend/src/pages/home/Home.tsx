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

  let recentsStyle = "mr-8"
  let trendingStyle = ""

  if(tab == TAB_STATE_ENUM.RECENTS){
    recentsStyle += " border-b-accent"
  }
  else{
    trendingStyle += " border-b-accent"
  }

  return (
    <div className='flex flex-col items-center justify-start h-screen pt-4' style = {
      {
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
      }
    }>
      <div className='pb-4'>
        <TextButton text='Recents' 
          onClick={() => {setTab(TAB_STATE_ENUM.RECENTS)}} 
          className={recentsStyle}
        />
        <TextButton text='Trending' 
          onClick={() => {setTab(TAB_STATE_ENUM.TRENDING)}}
          className={trendingStyle}
        />
      </div>
      {
        tab == TAB_STATE_ENUM.RECENTS ? <Feed searchTerm=''/> : <Trending />
      }
    </div>
  )
}

export default Home