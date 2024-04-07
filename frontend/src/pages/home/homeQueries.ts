
function listingQuery(){

  const listingProps = {
    user: "JaneDoe42",
    description: "Need 300 level electives",
    have: "PHIL 300",
    want: "CS 310, CS 349, CS 345, CS 343",
    tags: ["CS", "Electives", "300+"],
    created_at: new Date().toLocaleDateString(),
  };

  const listingProps2 = {
    user: "JohnDoe42",
    description: "Need 400 level electives",
    have: "PHIL 400",
    want: "CS 410, CS 449, CS 445, CS 443",
    tags: ["CS", "Electives", "400+"],
    created_at: "2024-04-06T15:30:00-04:00",
  };

  return [listingProps, listingProps2]
}

export { listingQuery }