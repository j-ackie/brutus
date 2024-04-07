import { useEffect, useState } from "react";
import Listing from "../Listing/Listing";
import { listingQuery } from "../../pages/home/homeQueries";

export function Feed() {
  const [listings, setListings] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/listings")
  //     .then((response) => response.json())
  //     .then((data) => setListings(data));
  // }, []);

  // return (
  //   <div>
  //     {listings.map((listing) => (
  //       <Listing key={listing.id} {...listing} />
  //     ))}
  //   </div>
  // );

  // map over the listings outputted by listingquery and return a listing component for each
  return (
    <div>
      {listingQuery()
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map((listing, index) => (
          <Listing key={index} {...listing} />
        ))}
    </div>
  );
}


export default Feed;

