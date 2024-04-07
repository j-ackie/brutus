import React, { useState } from 'react';
import Listing from '../../components/Listing/Listing';

const CreateListing = () => {
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');
  const [have, setHave] = useState('');
  const [want, setWant] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const handleCreateListing = () => {
    // Here you can send the listing data to your backend or perform other actions
    console.log('Creating listing:', { user, description, have, want, tags });
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() !== '') {
      setTags([...tags, tag.trim()]);
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div>
        <label>User:</label>
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Have:</label>
        <input type="text" value={have} onChange={(e) => setHave(e.target.value)} />
      </div>
      <div>
        <label>Want:</label>
        <input type="text" value={want} onChange={(e) => setWant(e.target.value)} />
      </div>
      <div>
        <label>Tags:</label>
        <input type="text" onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e.currentTarget.value)} />
        <div>
          {tags.map((tag, index) => (
            <div key={index}>
              <span>{tag}</span>
              <button onClick={() => handleRemoveTag(index)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleCreateListing}>Create Listing</button>
    </div>
  );
};

export default CreateListing;
