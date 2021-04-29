import React, { useState, useEffect } from 'react';
import styles from './searchBar.module.css';

const SearchBar = ({ handleQuery }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => handleQuery(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <input
      type="text"
      value={query}
      className={styles.searchBar}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;
