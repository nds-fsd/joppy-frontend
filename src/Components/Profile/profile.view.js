import React from 'react';
import styles from './profile.module.css';
import Tag from '../Tag';

const Profile = ({ userData }) => (
  <div className={styles.profile}>
    <h3>Short bio</h3>
    {userData ? <p>{userData.bio}</p> : null}
    <h3>Roles</h3>
    {userData ? userData.positions.map((position) => <Tag name={position.name} isActive />) : null}

    <h3>Skills</h3>

    {userData ? userData.skills.map((skill) => <Tag name={skill.name} isActive />) : null}

    <h3>Work Experience</h3>
    {userData ? <p>{userData.workExperiences}</p> : null}
    <h3>Education</h3>
    {userData ? <p>{userData.education}</p> : null}
    <h3>Languages</h3>
    {userData ? userData.languages.map((language) => <Tag name={language.name} isActive />) : null}

    <h3>Q&A</h3>
  </div>
);

export default Profile;
