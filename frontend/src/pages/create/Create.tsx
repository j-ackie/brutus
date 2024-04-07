import React, { useState } from 'react';
import { SubHeading, Heading } from '../../global/Text';
import { TextButton } from '../../global/Buttons';
import Input from '../../global/Input'; 
import InputWithDropdown from '../../global/Dropdown';
import MultiSelect from '../../global/Multiselect';
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
    'Other',
    '200+',
    '300+',
    '400+',
    'Web-Dev',
    'App-Dev',
    'Machine Learning',
    'AI',
    'Cybersecurity',
    'Networking',
    'Databases',
  ];

  const classes = [
    'CS 110',
    'CS 211',
    'CS 340',
    'CS 343',
    'CS 371',
    'CS 371',
  ]

  const handleCreateListing = () => {
    console.log('Creating listing:', { user, description, have, want, tags });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen pb-20" style={{
      background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
    }}>
      <div className="w-full max-w-md px-4 mb-4"> 
        <Heading text="Description: " color={COLORS.text} />
        <Input 
          type="text"
          value={description}
          name="description"
          placeholder="Enter a brief description..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          className="w-full" 
        />
      </div>

      <div className="w-full max-w-md px-4 mb-4">
        <Heading text="What types of classes are you looking for?" color={COLORS.text} />
        <MultiSelect
        options={categories}
        selectedValues={tags}
        onChange={setTags}
        className="w-full"
        />
      </div>
      <div className="w-full max-w-md px-4 mb-4">
        <Heading text="What are you willing to drop? " color={COLORS.text} />
        <InputWithDropdown
          value={have}
          name="have"
          options={classes}
          onChange={(value: string) => setHave(value)}
          className="w-full"
        />
      </div>

      <div className="w-full max-w-md px-4 mb-4">
        <Heading text="Which classes do you want? " color={COLORS.text} />
        <InputWithDropdown
          value={want}
          name="want"
          options={classes}
          onChange={(value: string) => setWant(value)}
          className="w-full"
        />
      </div>

      <TextButton text="Create Listing" onClick={handleCreateListing}>
      </TextButton>
    </div>
  );
};

export default CreateListing;
