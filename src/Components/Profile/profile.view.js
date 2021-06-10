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

        <div className={styles.headline}>Roles</div>
        {userData.positions && userData.positions.length > 0 ? (
          userData.positions.map((position) => (
            <>
              <Tag name={position.name.name} isActive />
            </>
          ))
        ) : (
          <p className={styles.infoText}>Add your roles in the profile editor.</p>
        )}

        <div className={styles.headline}>Skills</div>
        <div>
          {userData.skills && userData.skills.length > 0 ? (
            userData.skills.map((skill) => (
              <>
                <Tag name={skill.name.skill} isActive />
              </>
            ))
          ) : (
            <p className={styles.infoText}>Add your skills in the profile editor.</p>
          )}
        </div>

        <div className={styles.headline}>Work Experience</div>
        {userData.workExperiences && userData.workExperiences.length > 0 ? (
          userData.workExperiences.map((item) => (
            <>
              <div className={styles.itemText}>{item}</div>
            </>
          ))
        ) : (
          <p className={styles.infoText}>Add your experience in the profile editor.</p>
        )}

        <div className={styles.headline}>Education</div>
        {userData.education && userData.education.length > 0 ? (
          userData.education.map((item) => (
            <>
              <div className={styles.itemText}>{item}</div>
            </>
          ))
        ) : (
          <p className={styles.infoText}>Add your studies in the profile editor.</p>
        )}

        <div className={styles.headline}>Languages</div>
        <div>
          {userData && userData.languages.length > 0 ? (
            userData.languages.map((language) => (
              <>
                <Tag name={language.name} isActive />
              </>
            ))
          ) : (
            <p className={styles.infoText}>Add your languages in the profile editor.</p>
          )}
        </div>
      </>
    ) : (
      <Loader className={styles.Loader} />
    )}
  </div>
);

export default Profile;
