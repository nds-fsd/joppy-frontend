import React from 'react';
import styles from './profile.module.css';
// import Tag from '../Tag';

const Profile = ({ userData }) => (
  <div className={styles.profile}>
    <h3>Short bio</h3>
    {userData ? <p>{userData.bio}</p> : null}
    <h3>Roles</h3>

    {/* {userData.roles ? userData.roles.map((role) => <Tag key={role} role={role.role} />) : null} */}

    <h3>Skills</h3>

    {/* {userData.skills
      ? userData.skills.map((skill) => <Tag key={skill} skill={skill.skill} />)
      : null} */}

    <h3>Work Experience</h3>
    {userData ? <p>{userData.workExperiences}</p> : null}
    <h3>Education</h3>
    {userData ? <p>{userData.education}</p> : null}
    <h3>Languages</h3>
    {userData ? <p>{userData.languages}</p> : null}
    <h3>Q&A</h3>
  </div>
);

export default Profile;
