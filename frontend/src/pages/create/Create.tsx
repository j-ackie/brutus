import React, { useState } from 'react';
import { SubHeading, Heading } from '../../global/Text';
import { TextButton } from '../../global/Buttons';
import Input from '../../global/Input'; // Ensure this import path is correct
import InputWithDropdown from '../../global/Dropdown';
import { COLORS } from '../../global/Colors';

const CreateListing = () => {
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');
  const [have, setHave] = useState('');
  const [want, setWant] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const categories = [
    'Core',
    'Theory',
    'Interfaces',
    'Programming Languages',
    'Systems',
    'Projects',
    'Electives',
    'Math',
    'Other'
  ];


  const handleCreateListing = () => {
    // Here you can send the listing data to your backend or perform other actions
    console.log('Creating listing:', { user, description, have, want, tags });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen pb-20" style={{
      background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
    }}>
      {/* Wrap each input field and its label in a div with a specific max width */}
      <div className="w-full max-w-md px-4 mb-4"> {/* Adjust 'max-w-md' and 'px-4' as needed */}
        <Heading text="Description: " color={COLORS.text} />
        <Input 
          type="text"
          value={description}
          name="description"
          placeholder="Enter a brief description..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          className="w-full" // Ensures the input stretches to the full width of its parent
        />
      </div>

      {/* Repeat the pattern for other inputs and dropdowns */}
      <div className="w-full max-w-md px-4 mb-4">
        <Heading text="What are you dropping? " color={COLORS.text} />
        <InputWithDropdown
          value={have}
          name="have"
          options={categories}
          onChange={(value: string) => setHave(value)}
          className="w-full" // Applies full width to the dropdown
        />
      </div>

      <div className="w-full max-w-md px-4 mb-4">
        <Heading text="Which classes do you want? " color={COLORS.text} />
        <InputWithDropdown
          value={want}
          name="want"
          options={categories}
          onChange={(value: string) => setWant(value)}
          className="w-full"
        />
      </div>

      {/* Repeat for any additional inputs/dropdowns you might have */}

      <TextButton text="Post" onClick={handleCreateListing}></TextButton>
    </div>
  );
};

export default CreateListing;
