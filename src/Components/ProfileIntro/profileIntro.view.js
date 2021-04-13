import React from 'react';
import styles from './profileIntro.module.css';

const ProfileIntro = ({ userData }) => (
  <div className={styles.profileIntro}>
    {userData ? <img src={userData.photo} alt="user pic" className={styles.userPhoto} /> : null}
    {userData ? <p className={styles.userName}>{userData.userName}</p> : null}
    {userData ? (
      <p className={styles.userIntro}>
        {userData.city.name}. Worked at {userData.workExperiences}.
      </p>
    ) : null}
  </div>
);

export default ProfileIntro;
