import React from 'react'
import Listing from '../../components/Listing/Listing'
import {listingQuery} from '../../pages/home/homeQueries'
function Home() {

  const listing = listingQuery()

  return (
    <div>
      <Listing {...listing}/>
    </div>
  )
}

export default Home