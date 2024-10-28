import React from 'react';

const Search= ({ searchTerm, setSearchTerm, handleSearch }) => (
  <form onSubmit={handleSearch}>
    <input 
      type="text" 
      required 
      placeholder="Enter a search term"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button type="submit">Submit</button>
  </form>
);

export default Search;