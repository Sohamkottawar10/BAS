import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import '../css/SearchBooks.css';

const SearchBar = ({ books }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [searchBy, setSearchBy] = useState('title');

  useEffect(() => {
    if (search === '') {
      setResults([]);
      return;
    }

    const fuse = new Fuse(books, {
      keys: [searchBy],
      includeScore: true,
    });

    setResults(fuse.search(search));
  }, [search, books, searchBy]);

  return (
    <div className='search-bar'>
      <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      <div className="search-bar-container">
      <input
        type="text"
        placeholder={`Search books by ${searchBy}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {results.map(({ item }) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.author}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SearchBar;