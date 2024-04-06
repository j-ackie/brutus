
function listingQuery(){

  const listingProps = {
    user: "JaneDoe42",
    description: "Need 300 level electives",
    have: "PHIL 300",
    want: "CS 310, CS 349, CS 345, CS 343",
    tags: ["CS", "Electives", "300+"],
    created_at: new Date().toLocaleDateString(),
  };

  return listingProps
}

export { listingQuery }