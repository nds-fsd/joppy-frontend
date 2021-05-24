import React from 'react';
import styles from './profile.module.css';
import Tag from '../Tag';

const Profile = ({ userData, style }) => (
  <div className={styles.profile} style={style}>
    <div className={styles.headline}>Short bio</div>
    {userData ? <p className={styles.infoText}>{userData.bio}</p> : null}
    <div className={styles.headline}>Roles</div>
    {userData.positions
      ? userData.positions.map((position) => <Tag name={position.name.name} isActive />)
      : null}
    <div className={styles.headline}>Skills</div>
    <div>
      {userData.skills
        ? userData.skills.map((skill) => <Tag name={skill.name.skill} isActive />)
        : null}
    </div>
    <div className={styles.headline}>Work Experience</div>
    {userData.workExperiences
      ? userData.workExperiences.map((item) => <div className={styles.itemText}>{item}</div>)
      : null}
    <div className={styles.headline}>Education</div>
    {userData.education
      ? userData.education.map((item) => <div className={styles.itemText}>{item}</div>)
      : null}{' '}
    <div className={styles.headline}>Languages</div>
    <div>
      {userData
        ? userData.languages.map((language) => <Tag name={language.name} isActive />)
        : null}
    </div>
  </div>
);

export default Profile;
