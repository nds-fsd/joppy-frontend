import React, { useEffect, useState } from 'react';
import styles from './adminProfSkills.module.css';
import Tag from '../Tag';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';

const AdminProfSkills = ({ userSkills, close }) => {
  const userTech = userSkills;
  const newSkills = [];
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
    if (userTech.some((skill) => skill._id === skillId)) {
      setUpdatedSkills({
        ...updatedSkills,
        tech: [...userTech.filter((skill) => skill._id !== skillId), ...newSkills],
      });
    } else {
      newSkills.push(skillId);
      setUpdatedSkills({ tech: [...userTech, ...newSkills] });
    }
  };

  console.log('updatedSkills', updatedSkills);

  const saveSkills = () => {
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: JSON.stringify(updatedSkills),
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
              value={skill._id}
              onClick={addSkill}
              isActive={userTech.some((e) => e._id === skill._id)}
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
