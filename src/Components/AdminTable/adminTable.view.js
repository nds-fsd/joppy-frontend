import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/searchBar.view';
import styles from './adminTable.module.css';
import { fetchMeStuff } from '../../Utils/functions';

const AdminTable = ({ endpoint }) => {
  const [searchQuery, setSearchQuery] = useState(''); //eslint-disable-line
  const [responseArray, setResponseArray] = useState([]);
  const [pageNum, setPageNum] = useState('0');
  const [totalPages, setTotalPages] = useState(0);

  const [pageLimit, setPageLimit] = useState('5');
  const pageLimitNum = parseInt(pageLimit, 10);
  const sortBy = 'title';

  const initializeTotalPages = (count) => {
    setTotalPages(
      count % pageLimitNum === 0 ? count / pageLimitNum : Math.floor(count / pageLimitNum) + 1
    );
  };

  const actualPageNumber = (page) => (parseInt(page, 10) + 1).toString();

  const options = {
    method: 'POST',
    headers: new Headers({
      Accept: 'apllication/json',
      'Content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
    }),
    mode: 'cors',
  };

  useEffect(() => {
    fetchMeStuff(`http://localhost:3001/${endpoint}/count`, options, initializeTotalPages);
  }, [pageLimit]);

  useEffect(() => {
    fetchMeStuff(
      `http://localhost:3001/${endpoint}/search?page=${pageNum}&limit=${pageLimit}&sort=${sortBy}&dir=asc`,
      options,
      setResponseArray
    );
  }, [pageNum, pageLimit]);

  return (
    <div className={styles.tableBody}>
      <div className={styles.topRow}>
        <SearchBar handleQuery={(q) => setSearchQuery(q)} />
      </div>
      <div className={styles.firstTableRow}>
        <p className={styles.tableRowItem}>Title</p>
        <p className={styles.tableRowItem}>Position</p>
        <p className={styles.tableRowItem}>Description</p>
        <p className={styles.tableRowItem}>Status</p>
        <p className={styles.tableRowItem}>Creation Date</p>
      </div>
      <div className={styles.tableContents}>
        {responseArray &&
          responseArray.map((object) => (
            <div className={styles.tableRow}>
              <p className={styles.tableRowItem}>{object.title}</p>
              <p className={styles.tableRowItem}>Position</p>
              <p className={styles.tableRowItem}>{object.description}</p>
              <p className={styles.tableRowItem}>Status</p>
              <p className={styles.tableRowItem}>{object.createdAt}</p>
            </div>
          ))}
      </div>
      <div className={styles.tableControls}>
        <p>
          Rows per page:{' '}
          <span>
            <select onChange={(e) => setPageLimit(e.target.value)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </span>
        </p>
        <p>
          Page <span>{actualPageNumber(pageNum)}</span> of <span>{totalPages}</span>
        </p>
        <button type="button" onClick={() => setPageNum((parseInt(pageNum, 10) - 1).toString())}>
          {'<'}
        </button>
        <button type="button" onClick={() => setPageNum((parseInt(pageNum, 10) + 1).toString())}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default AdminTable;
