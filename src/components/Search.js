"use client"

import { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);  // Pass the search query to the parent component
    }
  };

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '16px',              
    fontSize: '16px',             
    borderRadius: '10px',         
    border: '3px solid #ccc',     
    width: '700px',               
  },
  button: {
    padding: '16px 16px',         
    marginLeft: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',             
    border: 'none',
    borderRadius: '10px',         
    cursor: 'pointer',
  },
};


export default SearchComponent;
