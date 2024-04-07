// import { useEffect, useState } from "react";
// import { Listing } from "../Listing/Listing";

// export function Feed() {
//   const [listings, setListings] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/listings")
//       .then((response) => response.json())
//       .then((data) => setListings(data));
//   }, []);

//   return (
//     <div>
//       {listings.map((listing) => (
//         <Listing key={listing.id} {...listing} />
//       ))}
//     </div>
//   );
// }

