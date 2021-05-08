import React from 'react';
import styles from './profileIntro.module.css';

const ProfileIntro = ({ userData }) => (
  <div className={styles.profileIntro}>
    {userData ? <img src={userData.photo} alt="user pic" className={styles.userPhoto} /> : null}
    {userData ? <p className={styles.userName}>{userData.name}</p> : null}
    {userData ? (
      <p className={styles.userIntro}>
        {userData.location.name}. Worked at {userData.workExperiences[0]}.
      </p>
    ) : null}
  </div>
);

export default ProfileIntro;
