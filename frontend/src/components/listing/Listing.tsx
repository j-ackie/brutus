import React from 'react';
import { Label, RegText, SubHeading, Heading } from "../../global/Text";

interface ListingProps {
  user: string;
  description: string;
  have: string;
  want: string;
  tags: string[];
  created_at: string;
}

const Listing: React.FC<ListingProps> = ({ user, description, have, want, tags, created_at }) => {
  const tagsDisplay = tags.join(', ');

  return (
    <div className="card mb-3" style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px', padding: '20px', border: '1px solid #ccc', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <RegText text={`Posted by: ${user}`} />
        <RegText text={`Have: ${have}`} />
        <RegText text={`Want: ${want}`} />
      </div>
      {/* Explicitly align the description text to the left */}
      <div style={{ textAlign: 'left', marginBottom: '10px' }}>
        <RegText text={description} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <RegText text={`Tags: ${tagsDisplay}`} />
      </div>
      <div style={{ position: 'absolute', bottom: '10px', right: '20px' }}>
        <RegText text={`Created at: ${created_at}`} />
      </div>
    </div>
  );
}

export default Listing;
