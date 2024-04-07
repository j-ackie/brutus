// Search.js
import React, { useState } from "react";
import Input from "../../global/Input";
import Feed from "../../components/Feed/Feed";

function Search() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Input
        type="text"
        value={search}
        name="search"
        placeholder="Search..."
        className="w-full"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <Feed searchTerm={search} />
    </div>
  );
}

export default Search;
