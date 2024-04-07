import React from 'react'
import Feed from '../../components/Feed/Feed'
// import Listing from '../../components/Listing/Listing'
// import { listingQuery } from '../../pages/home/homeQueries'
import { COLORS } from '../../global/Colors'

function Home() {

  return (
    <div style = {
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`,
      }
    }>
      <Feed />
      
    </div>
  )
}

export default Home