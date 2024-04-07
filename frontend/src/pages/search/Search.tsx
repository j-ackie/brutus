import React, { useState } from "react";
import Input from "../../global/Input";
import Feed from "../../components/Feed/Feed";
import { COLORS } from "../../global/Colors";
import { Label, SubHeading } from "../../global/Text";

function Search() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]); 
  const tags = ["React", "JavaScript", "CSS", "HTML", "CS", "300"];

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-4"
    style = {
      {
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
      }
    }>
      <Input
        type="text"
        value={search}
        name="search"
        placeholder="Search..."
        className="mb-4 w-4/5 "
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
  
      <div className="flex-1 w-4/5 flex flex-row justify-between overflow-y-scroll">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px', width: '4/5' }}>
            {tags.map(tag => (
              <div key={tag} style={{
                backgroundColor: selectedTags.includes(tag) ? COLORS.accent : "grey",
                borderRadius: '20px',
                padding: '5px 10px', // Adjusted padding
                color: 'black',
                cursor: 'pointer',
                display: 'flex', // Ensure the content is centered
                alignItems: 'center', // Center content vertically
                justifyContent: 'center', // Center content horizontally
                height: '30px', // Specify a fixed height
                lineHeight: '20px', // Adjust line height to ensure text is centered
                fontSize: '14px', // Optional: adjust font size for aesthetics
              }} onClick={() => toggleTag(tag)}>
                <Label text={`#${tag}`} color={COLORS.text}/>
              </div>
            ))}
          </div>

        <Feed searchTerm={search} selectedTags={selectedTags}/>
      </div>
    </div>
  );
}

export default Search;

