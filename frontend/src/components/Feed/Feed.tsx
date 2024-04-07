import React from "react";
import Listing from "../Listing/Listing";
import { listingQuery } from "../../pages/home/homeQueries";
import Fuse from "fuse.js";

interface ListingItem {
  id: string;
  user: string;
  description: string;
  have: string;
  want: string;
  tags: string[];
  created_at: string;
}

// Function to generate unique ID
function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function Feed({ searchTerm = "" }: { searchTerm: string }) {
  const listings = listingQuery();
  listings.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const fuseOptions = {
    keys: ["description", "user", "tags", "have", "want"],
    threshold: 0.4,
  };

  const fuse = new Fuse(listings, fuseOptions);

  const searchResults: ListingItem[] = searchTerm
    ? fuse
        .search(searchTerm)
        .map((item: any) => ({ ...item.item, id: generateId() }))
    : listings.map((item: any) => ({ ...item, id: generateId() }));

  return (
    <div className="overflow-y-scroll pb-20">
      {searchResults.map((result, index) => (
        <Listing key={result.id} {...result} />
      ))}
    </div>
  );
}

export default Feed;
