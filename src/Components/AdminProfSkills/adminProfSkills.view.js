import React, { useEffect, useState } from 'react';
import styles from './adminProfSkills.module.css';
import Tag from '../Tag';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';

const AdminProfSkills = ({ userSkills, close }) => {
  const [skills, setSkills] = useState([]);
  const [updatedSkills, setUpdatedSkills] = useState({ tech: [] });
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
    if (userSkills.some((e) => e._id === skillId)) {
      setUpdatedSkills({ ...userSkills, ...userSkills.filter((s) => s !== skillId) });
    } else {
      setUpdatedSkills({ tech: [...userSkills, skillId] });
    }
  };

  console.log(updatedSkills);

  const saveSkills = () => {
    const options = {
      method: 'PUT',
      headers: new Headers({ Accept: 'application/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify(updatedSkills),
    };
    const url = `http://localhost:3001/user/${getSessionUser().id}`;

    if (getUserToken()) {
      fetch(url, authObject, options)
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
              value={skill._id}
              onClick={addSkill}
              isActive={userSkills.some((e) => e._id === skill._id)}
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
