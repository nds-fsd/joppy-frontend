import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import styles from './searchBar.module.css';

const SearchBar = ({ handleQuery }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => handleQuery(query), 400);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <div className={styles.searchBarContainer}>
      <FontAwesomeIcon className={styles.searchBarIcon} icon="search" />
      <input
        type="text"
        value={query}
        className={styles.searchBar}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
