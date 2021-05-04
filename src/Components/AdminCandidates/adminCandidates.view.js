import React, { useEffect, useState } from 'react';
import styles from './adminCandidates.module.css';
import { getUserToken } from '../../Utils/Auth';

const AdminCandidates = () => {
  const [userData, setUserData] = useState();
  const userToken = getUserToken();
  // const userSession = getSessionUser();

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  };

  useEffect(() => {
    fetch('http://localhost:3001/user?role=DEVELOPER_ROLE', authObject)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch();
  }, []);

  return (
    <div className={styles.adminCandidates}>
      <div className={styles.searchbarRow}>Searchbar</div>
      <div className={styles.firstTableRow}>
        <p className={styles.firstTableRowItem}>Name</p>
        <p className={styles.firstTableRowItem}>Offer</p>
        <p className={styles.firstTableRowItem}>Position</p>
        <p className={styles.firstTableRowItem}>Skills</p>
        <p className={styles.firstTableRowItem}>Location</p>
        <p className={styles.firstTableRowItem}>Enrolled</p>
      </div>
      <div className={styles.tableContent}>
        {userData
          ? userData.map((user) => (
              <div className={styles.tableRow}>
                <div className={styles.tableRowItem}>{user.name}</div>
                <div className={styles.tableRowItem}>Offer</div>
                <div className={styles.tableRowItem}>{user.skills.skill}</div>
                <div className={styles.tableRowItem}>{user.positions.name}</div>
                <div className={styles.tableRowItem}>{user.location}</div>
                <div className={styles.tableRowItem}>{user.updatedAt}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminCandidates;
