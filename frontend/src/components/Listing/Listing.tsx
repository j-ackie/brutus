import React from 'react';
import { Label, RegText, SubHeading, Heading } from "../../global/Text";
import { COLORS } from '../../global/Colors';

interface ListingProps {
  user: string;
  description: string;
  have: string;
  want: string;
  tags: string[];
  created_at: string;
}

function formatTimeAgo(created_at: string): string {
  const date = new Date(created_at);
  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;
  const diffInMinutes = Math.round(diffInSeconds / 60);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays}d`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  } else {
    return `${Math.round(diffInSeconds)}s`;
  }
}

const Listing: React.FC<ListingProps> = ({ user, description, have, want, tags, created_at }) => {
  const timeAgo = formatTimeAgo(created_at);

  return (
    <div className="listing-card" style={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '600px',
      padding: '20px',
      borderRadius: '20px',
      margin: '3px auto',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      backgroundColor: COLORS.text, 
      color: '#FFF', 
      position: 'relative',
    }}>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', fontSize: '0.8em', justifyContent: 'flex-start' }}>
        <SubHeading text={`@${user}`} color={COLORS.primary} /> 
        <span style={{ margin: '0 5px', color: COLORS.accent }}>&middot;</span>
        <div style={{
          backgroundColor: COLORS.red,
          borderRadius: '20px',
          padding: '2px 6px',
          color: 'white',
          display: 'inline-block',
        }}>
          <Label text={`- ${have}`} color="#FFF"/>
        </div>
        <span style={{ margin: '0 5px', color: COLORS.accent }}>&middot;</span>
        <div style={{
          backgroundColor: COLORS.green,
          borderRadius: '20px',
          padding: '2px 6px',
          color: 'white',
          display: 'inline-block',
        }}>
          <Label text={`+ ${want}`} color="#ffffff"/>
        </div>
        <span style={{ margin: '0 5px', color: COLORS.accent }}>&middot;</span>
        <RegText text={timeAgo} color="#657786"/>
      </div>
      <div style={{ textAlign: 'left', marginBottom: '10px' }}>
        <RegText text={description} color={COLORS.black}/>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
        {tags.map(tag => (
          <div key={tag} style={{
            backgroundColor: COLORS.accent, 
            borderRadius: '20px',
            padding: '2px 10px',
            color: 'black', 
          }}>
            <Label text={`#${tag}`} color={COLORS.text}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listing;