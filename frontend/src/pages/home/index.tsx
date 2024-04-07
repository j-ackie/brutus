import { listingQuery } from '../../pages/home/homeQueries'
import { COLORS } from '../../global/Colors'
import { TextButton } from '../../global/Buttons'
import Feed from '../../components/Feed/Feed'

const TAB_STATE_ENUM = {
  RECENTS: 0,
  TRENDING: 1
}

function Home() {

  const listing = listingQuery()

  return (
    <div style = {
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        height: "100%",
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
      }
    }>
      <div>
        <TextButton text='Recents' onClick={() => {}}/>
        <TextButton text='Trending' onClick={() => {}}/>
      </div>
      <Feed />
    </div>
  )
}

export default Home