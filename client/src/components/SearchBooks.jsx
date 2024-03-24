import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import '../css/SearchBooks.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import BookCard from './BookCard'; // Import the BookCard component

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
        <Link to={`/book/${item._id}`} key={item._id}> {/* Add this line */}
          <BookCard book={item} /> {/* Use the BookCard component here */}
        </Link> // And this line
      ))}
      </div>
    </div>
  );
};

export default SearchBar;