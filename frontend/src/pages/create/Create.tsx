import React, { useState } from 'react';
import { SubHeading } from '../../global/Text';
import { TextButton } from '../../global/Buttons';
import { COLORS } from '../../global/Colors';

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
    <div className="flex flex-col items-center justify-start h-screen pt-4" style = {
      {
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
      }
    }>
      <div className="mb-4">
        <SubHeading text="Description: " color={COLORS.text} />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="rounded-md px-2 py-1 border border-gray-400"
        />
      </div>
      <div className="mb-4">
        <SubHeading text="What are you dropping? " color={COLORS.text} />
        <input 
          type="text" 
          value={have} 
          onChange={(e) => setHave(e.target.value)} 
          className="rounded-md px-2 py-1 border border-gray-400"
        />
      </div>
      <div className="mb-4">
        <SubHeading text="Which classes do you want? " color={COLORS.text} />
        <input 
          type="text" 
          value={want} 
          onChange={(e) => setWant(e.target.value)} 
          className="rounded-md px-2 py-1 border border-gray-400"
        />
      </div>
      <div className="mb-4">
        <SubHeading text="Tags: " color={COLORS.text} />
        <input 
          type="text" 
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e.currentTarget.value)} 
          className="rounded-md px-2 py-1 border border-gray-400"
        />
        <div>
          {tags.map((tag, index) => (
            <div key={index}>
              <span>{tag}</span>
              <TextButton text="x" onClick={() => handleRemoveTag(index)}></TextButton>
            </div>
          ))}
        </div>
      </div>
      <TextButton text="Post" onClick={handleCreateListing}></TextButton>
    </div>
  );
};

export default CreateListing;
