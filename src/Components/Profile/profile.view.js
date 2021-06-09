import React from 'react';
import styles from './profile.module.css';
import Tag from '../Tag';
import Loader from '../Loader';

const Profile = ({ userData, style }) => (
  <div className={styles.profile} style={style}>
    {userData ? (
      <>
        <div className={styles.headline}>Short bio</div>
        {userData.bio ? (
          <p className={styles.infoText}>{userData.bio}</p>
        ) : (
          <p className={styles.infoText}>Add a short bio.</p>
        )}
        {userData.positions
          ? userData.positions.map((position) => (
              <>
                <div className={styles.headline}>Roles</div>
                <Tag name={position.name.name} isActive />
              </>
            ))
          : null}
        <div>
          {userData.skills
            ? userData.skills.map((skill) => (
                <>
                  <div className={styles.headline}>Skills</div>
                  <Tag name={skill.name.skill} isActive />
                </>
              ))
            : null}
        </div>
        {userData.workExperiences
          ? userData.workExperiences.map((item) => (
              <>
                <div className={styles.headline}>Work Experience</div>
                <div className={styles.itemText}>{item}</div>
              </>
            ))
          : null}
        {userData.education
          ? userData.education.map((item) => (
              <>
                <div className={styles.headline}>Education</div>
                <div className={styles.itemText}>{item}</div>
              </>
            ))
          : null}{' '}
        <div>
          {userData
            ? userData.languages.map((language) => (
                <>
                  <div className={styles.headline}>Languages</div>
                  <Tag name={language.name} isActive />
                </>
              ))
            : null}
        </div>
      </>
    ) : (
      <Loader className={styles.Loader} />
    )}
  </div>
);

export default Profile;
