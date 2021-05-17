import React, { useEffect, useState } from 'react';
import styles from './adminProfSkills.module.css';
import Tag from '../Tag';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';
// import UserContext from '../../Contexts/userContext';

const AdminProfSkills = ({ userSkills, close }) => {
  // const userInfo = useContext(UserContext);
  const [skills, setSkills] = useState([]);
  const [updatedSkills, setUpdatedSkills] = useState(userSkills);
  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  };
  useEffect(() => {
    fetchMeStuff('http://localhost:3001/skill', authObject, setSkills);
  }, []);

  const addSkill = (skillId) => {
    if (updatedSkills.some((skill) => skill._id === skillId._id)) {
      setUpdatedSkills([...updatedSkills.filter((skill) => skill._id !== skillId._id)]);
    } else {
      setUpdatedSkills([...updatedSkills, skillId]);
    }
  };

  const saveSkills = () => {
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: JSON.stringify({ tech: updatedSkills }),
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
        .then(close())
        .catch();
    }
  };

  return (
    <div className={styles.adminProfSkills}>
      <p>Select your technology stack</p>
      {skills
        ? skills.map((skill) => (
            <Tag
              name={skill.skill}
              value={skill}
              onClick={addSkill}
              isActive={updatedSkills.some((e) => e._id === skill._id)}
            />
          ))
        : null}
      <div className={styles.buttons}>
        <input type="button" value="Save" onClick={saveSkills} className={styles.saveButton} />
        <input type="button" className={styles.cancelButton} value="Cancel" onClick={close} />
      </div>
    </div>
  );
};
export default AdminProfSkills;
