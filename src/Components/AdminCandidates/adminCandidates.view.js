import React, { useEffect, useState } from 'react';
import styles from './adminCandidates.module.css';

const AdminCandidates = () => {
  const [userData, setUserData] = useState();

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
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
      <div className={styles.headline}>
        <p>Name</p>
        <p>Skills</p>
        <p>Position</p>
        <p>Location</p>
        <p>Enrolled</p>
      </div>
      <div className={styles.userNames}>
        {userData ? userData.map((user) => <div>{user.name}</div>) : null}
      </div>
      <div className={styles.userOffer}>
        {userData ? userData.map((user) => <div>{user.skills.name}</div>) : null}
      </div>
      <div className={styles.userPosition}>
        {userData ? userData.map((user) => <div>{user.positions.name}</div>) : null}
      </div>
      <div className={styles.userCity}>
        {userData ? userData.map((user) => <div>{user.location}</div>) : null}
      </div>
      <div className={styles.userStatus}>
        {userData ? userData.map((user) => <div>{user.createdAt}</div>) : null}
      </div>
    </div>
  );
};

export default AdminCandidates;
