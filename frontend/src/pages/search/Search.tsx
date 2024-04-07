import React, { useState } from "react";
import Input from "../../global/Input";
import Feed from "../../components/Feed/Feed";
import { COLORS } from "../../global/Colors";
function Search() {
  const [search, setSearch] = useState("");

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
        <div>
          alsdifuhlaueghaowiguh
        </div>
        <Feed searchTerm={search}/>
      </div>
    </div>
  );
}

export default Search;