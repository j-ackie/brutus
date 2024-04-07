import React, { useState } from "react";
import Input from "../../global/Input";
import Feed from "../../components/Feed/Feed";
import { COLORS } from "../../global/Colors";
import { Label, SubHeading } from "../../global/Text";

function Search() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["React", "JavaScript", "CSS", "HTML", "CS", "300", "400", "500", "600", "700"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-4 pl-16 pr-16" style={{
      background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
    }}>
      <Input
        type="text"
        value={search}
        name="search"
        placeholder="Search..."
        className="mb-4 w-full"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />

      {/* Adjusted layout container */}
      <div className="flex w-full" style={{ height: 'calc(100% - 4rem)' }}> {/* Adjust height calculation as needed */}
        <div className="w-1/2" style={{ marginRight: '10px' }}> {/* Tags container */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            overflowY: 'auto',
            maxHeight: '100%', // Ensure this is 100% of the parent's height
            justifyContent: 'left',
          }}>
            {tags.map(tag => (
              <div key={tag} onClick={() => toggleTag(tag)} style={{
                backgroundColor: selectedTags.includes(tag) ? COLORS.accent : "grey",
                borderRadius: '20px',
                padding: '5px 10px',
                color: 'black',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}>
                <Label text={`#${tag}`} color={COLORS.text}/>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 overflow-y-auto"> {/* Feed container */}
          <Feed searchTerm={search} selectedTags={selectedTags}/>
        </div>
      </div>
    </div>
  );
}

export default Search;
