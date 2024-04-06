import React from 'react'
import Listing from '../../components/Listing/Listing'
import { listingQuery } from '../../pages/home/homeQueries'
import { COLORS } from '../../global/Colors'

function Home() {

  const listing = listingQuery()

  return (
    <div style = {
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: COLORS.primary
      }
    }>
      
      <Listing {...listing}/>
    </div>
  )
}

export default Home