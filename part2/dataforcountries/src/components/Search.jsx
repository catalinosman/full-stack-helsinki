/* eslint-disable react/prop-types */
import { useState } from "react";

const Search = ({ searchCountries }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Call the function passed as a prop to fetch countries
    searchCountries(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a country"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
