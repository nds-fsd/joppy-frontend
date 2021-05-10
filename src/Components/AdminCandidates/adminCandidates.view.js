import React, { useEffect, useState } from 'react';
import styles from './adminCandidates.module.css';
import { getUserToken } from '../../Utils/Auth';

const AdminCandidates = () => {
  const [userData, setUserData] = useState();
  const userToken = getUserToken();
  // const [acceptedOffer, setAcceptedOffer] = useState([]);
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

  // if (userData) {
  //   fetch(`http://localhost:3001/offer?accepted=${userData.id}`, authObject)
  //     .then((res) => res.json())
  //     .then((data) => setAcceptedOffer(data))
  //     .catch();
  // }

  // console.log(acceptedOffer);

  return (
    <div className={styles.tableBody}>
      <div className={styles.topRow}>Searchbar</div>
      <div className={styles.firstTableRow}>
        <p className={styles.firstTableRowItem}>Name</p>
        <p className={styles.firstTableRowItem}>Offer</p>
        <p className={styles.firstTableRowItem}>Position</p>
        <p className={styles.firstTableRowItem}>Skills</p>
        <p className={styles.firstTableRowItem}>Location</p>
        <p className={styles.firstTableRowItem}>Enrolled</p>
      </div>
      <div className={styles.tableContents}>
        {userData
          ? userData.map((user) => (
              <div className={styles.tableRow}>
                <div className={styles.tableRowItem}>{user.name}</div>
                <div className={styles.tableRowItemColor}>Offer title</div>
                <div className={styles.tooltip}>{user.skills.name}</div>
                <div className={styles.tableRowItemTool}>{user.positions.name}</div>
                <div className={styles.tableRowItem}>{user.location}</div>
                <div className={styles.tableRowItem}>{user.updatedAt}</div>
              </div>
            ))
          : null}
      </div>
      <div className={styles.tableControls}>
        <p className={styles.controlField}>Rows per page: </p>
        <p className={styles.controlField}>Page </p>
        <button className={styles.arrowButton} type="button">
          {'<'}
        </button>
        <button className={styles.arrowButton} type="button">
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default AdminCandidates;
