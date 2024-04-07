import React from "react";
import Listing from "../Listing/Listing";
import { listingQuery } from "../../pages/home/homeQueries";
import Fuse from 'fuse.js';

interface ListingItem {
  id: string;
  user: string;
  description: string;
  have: string;
  want: string;
  tags: string[];
  created_at: string;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function Feed({ searchTerm = '', selectedTags = [] }: { searchTerm: string, selectedTags?: string[] }) {
  const listings = listingQuery();
  listings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const fuseOptions = {
    keys: ['description', 'user', 'have', 'want'],
    threshold: 0.4,
  };

  const fuse = new Fuse(listings, fuseOptions);

  let searchResults: ListingItem[] = searchTerm ? 
    fuse.search(searchTerm).map((item: any) => item.item) : 
    listings;

  // After initial search, filter by selectedTags if any
  if (selectedTags && selectedTags.length > 0) {
    searchResults = searchResults.filter(listing => 
      // Ensure at least one of the selectedTags is present in the listing's tags
      listing.tags.some(tag => selectedTags.includes(tag))
    );
  }

  // Generate a unique ID for each listing result to ensure React keys are unique
  searchResults = searchResults.map(listing => ({ ...listing, id: generateId() }));

  return (
    <div className='overflow-y-scroll pb-20'>
      {searchResults.map((result) => (
        <Listing key={result.id} {...result} />
      ))}
    </div>
  );
}

export default Feed;
