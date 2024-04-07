import React, { useState } from 'react';
import { SubHeading } from '../../global/Text';
import { TextButton } from '../../global/Buttons';
import InputWithDropdown from '../../components/Dropdown/Dropdown'; // Import your custom InputWithDropdown component
import { COLORS } from '../../global/Colors';

const CreateListing = () => {
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');
  const [have, setHave] = useState('');
  const [want, setWant] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const randomOptions = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Literature',
    'Computer Science',
    'Art',
    'Music',
    'Geography'
  ];
  
  const handleCreateListing = () => {
    // Here you can send the listing data to your backend or perform other actions
    console.log('Creating listing:', { user, description, have, want, tags });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-4" style={{
      background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
    }}>
      <div className="mb-4">
        <SubHeading text="Description: " color={COLORS.text} />
        <InputWithDropdown
          value={description}
          name={"description"}
          options={randomOptions} // You can pass options for the dropdown here
          onChange={(value: string) => setDescription(value)}
        />
      </div>
      <div className="mb-4">
        <SubHeading text="What are you dropping? " color={COLORS.text} />
        <InputWithDropdown
          value={have}
          name={"have"}
          options={randomOptions} // You can pass options for the dropdown here
          onChange={(value: string) => setHave(value)}
        />
      </div>
      <div className="mb-4">
        <SubHeading text="Which classes do you want? " color={COLORS.text} />
        <InputWithDropdown
          value={want}
          name={"want"}
          options={randomOptions} // You can pass options for the dropdown here
          onChange={(value: string) => setWant(value)}
        />
      </div>
      <div className="mb-4">
        {/* Additional input with dropdown */}
      </div>
      <TextButton text="Post" onClick={handleCreateListing}></TextButton>
    </div>
  );
};

export default CreateListing;
