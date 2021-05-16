import React, { useState } from 'react';
import styles from './profileEdit.module.css';
import AdminProfSkillsProps from '../AdminProfSkillsProps/adminProfSkillsProps';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
// import { fetchMeStuff } from '../../Utils/functions';

const ProfileEdit = ({ userData }) => {
  const [newSkills, setNewSkills] = useState(userData.skills);
  //  const userToken = getUserToken();
  // const authObject = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${userToken}`,
  //   },
  // };

  // useEffect(() => {
  //   fetchMeStuff('http://localhost:3001/city', authObject, setLocations);
  // }, [openModal]);

  const saveSkills = () => {
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: JSON.stringify({ skills: newSkills }),
    };
    const url = `http://localhost:3001/user/${getSessionUser().id}`;
    if (getUserToken()) {
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject();
        })
        .then((res) => {
          console.log(res);
        })
        // .then(close())
        .catch();
    }
  };
  console.log(newSkills);

  return (
    <div className={styles.profileEdit}>
      <div className={styles.headline}>Short bio</div>
      {userData ? <p className={styles.infoText}>{userData.bio}</p> : null}
      <div className={styles.headline}>Roles</div>

      <div className={styles.headline}>Skills</div>
      <AdminProfSkillsProps
        userSkills={userData.skills}
        saveSkills={saveSkills}
        newSkills={(value) => setNewSkills(value)}
      />

      <div className={styles.headline}>Work Experience</div>
      {userData ? <p className={styles.infoText}>{userData.workExperiences}</p> : null}
      <div className={styles.headline}>Education</div>
      {userData ? <p className={styles.infoText}>{userData.education}</p> : null}
      <div className={styles.headline}>Languages</div>
    </div>
  );
};

export default ProfileEdit;
