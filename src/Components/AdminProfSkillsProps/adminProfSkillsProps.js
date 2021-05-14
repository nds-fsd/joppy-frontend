import React, { useEffect, useState } from 'react';
import styles from './adminProfSkillsProps.module.css';
import Tag from '../Tag';
import { getUserToken } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';

const AdminProfSkillsProps = ({ newSkills, userSkills, close, saveSkills }) => {
  const [skills, setSkills] = useState([]);
  // const getSkills = [];
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
      newSkills(updatedSkills);
    } else {
      setUpdatedSkills([...updatedSkills, skillId]);
      newSkills(updatedSkills);
    }
  };

  return (
    <div className={styles.adminProfSkillsProps}>
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
export default AdminProfSkillsProps;
