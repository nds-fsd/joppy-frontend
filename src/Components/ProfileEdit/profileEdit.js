import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './profileEdit.module.css';
import { getSessionUser, getUserToken } from '../../Utils/Auth';
import Tag from '../Tag';
import SalarySlider from '../SalarySlider';

const ProfileEdit = ({ userData, skills, positions, languages }) => {
  const history = useHistory();
  const userSession = getSessionUser();
  console.log(skills, languages, positions);
  const [newEducation, setNewEducation] = useState(userData.education);
  const [newWorkExperiences, setNewWorkExperiences] = useState(userData.workExperiences);
  const [newSalary, setNewSalary] = useState(userData.salary);
  const [newLanguages, setNewLanguages] = useState(userData.languages);
  const [newSkills, setNewSkills] = useState(userData.skills);
  const [newPositions, setNewPositions] = useState(userData.positions);
  const updatedUser = {
    skills: [newSkills],
    positions: [newPositions],
    salary: newSalary,
    languages: [newLanguages],
    workExperiences: [newWorkExperiences],
    education: [newEducation],
  };

  console.log(updatedUser);

  const updateUser = () => {
    const url = `http://localhost:3001/user/${getSessionUser().id}`;
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: JSON.stringify(updatedUser),
    };
    if (userSession) {
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
        .then(history.push('/profile'))
        .catch();
    }
  };

  const addSkill = (selSkill) => {
    if (newSkills.some((skill) => skill._id === selSkill._id || skill.name._id === selSkill._id)) {
      setNewSkills([
        ...newSkills.filter(
          (skill) => skill._id !== selSkill._id && skill.name._id !== selSkill._id
        ),
      ]);
    } else {
      setNewSkills([...newSkills, { name: selSkill._id, years: '1' }]);
    }
  };
  const addSkillYears = (y, skill) => {
    const objIndex = newSkills.findIndex((obj) => obj || obj.name === skill);
    console.log(objIndex);
    newSkills[objIndex].years = y;

    setNewSkills(newSkills);
  };

  const addPosition = (selPosition) => {
    if (
      !newPositions.some((e) => e._id === selPosition || e.name._id === selPosition) &&
      newPositions.length === 3
    ) {
      return;
    }
    if (newPositions.some((e) => e._id === selPosition || e.name._id === selPosition)) {
      setNewPositions([
        ...newPositions.filter((e) => e._id !== selPosition && e.name._id !== selPosition),
      ]);
    } else {
      setNewPositions([...newPositions, { name: selPosition, years: '1' }]);
    }
  };
  const addPositionYears = (y, positionName) => {
    const objIndex = newPositions.findIndex(
      (position) => position.name === positionName || position.name.name === positionName
    );
    newPositions[objIndex].years = y;

    setNewPositions({
      ...newPositions,
    });
  };

  console.log(newSkills, newPositions, newLanguages);

  const addLanguage = (selLanguage) => {
    if (newLanguages.some((language) => language._id === selLanguage._id)) {
      setNewLanguages([...newLanguages.filter((language) => language._id !== selLanguage._id)]);
    } else {
      setNewLanguages([...newLanguages, selLanguage]);
    }
  };

  return (
    <div className={styles.profileEdit}>
      <div className={styles.headline}>Roles</div>
      <div className={styles.tagBlock}>
        {positions
          ? positions.map((position) => (
              <Tag
                name={position.name}
                value={position._id}
                onClick={addPosition}
                isActive={newPositions.some((e) => e.name._id === position._id)}
              />
            ))
          : null}
      </div>
      <p>Use the slider to select your years of experience with each</p>
      <div className={styles.itemSlider}>
        {newPositions
          ? newPositions.map((position) => (
              <>
                <Tag name={position.name.name} isActive />
                <input
                  type="range"
                  min="0"
                  max="11"
                  step="1"
                  value={position.years}
                  onChange={(e) => addPositionYears(e.target.value, position.name)}
                />
                <span>{position.years === '0' && '<1'}</span>
                <span>{position.years === '11' && '>10'}</span>
                <span>{position.years !== '0' && position.years !== '11' && position.years}</span>
              </>
            ))
          : null}
      </div>
      <div className={styles.headline}>Skills</div>
      <div className={styles.tagBlock}>
        {skills
          ? skills.map((skill) => (
              <Tag
                name={skill.skill}
                value={skill.name}
                onClick={addSkill}
                isActive={newSkills.some((e) => e.name._id === skill._id)}
              />
            ))
          : null}
      </div>
      <p>Use the slider to select your years of experience with each</p>
      <div className={styles.itemSlider}>
        {newSkills
          ? newSkills.map((skill) => (
              <>
                <Tag name={skill.name.skill} isActive />
                <input
                  type="range"
                  min="0"
                  max="11"
                  step="1"
                  value={skill.years}
                  onChange={(e) => addSkillYears(e.target.value, skill)}
                />
                <span>{skill.years === '0' && '<1'}</span>
                <span>{skill.years === '11' && '>10'}</span>
                <span>{skill.years !== '0' && skill.years !== '11' && skill.years}</span>
              </>
            ))
          : null}
      </div>
      <div className={styles.headline}>Work Experience</div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={newWorkExperiences}
          onChange={(e) => setNewWorkExperiences(e.target.value)}
          className={styles.inputWrapper}
        />
      </div>

      <div className={styles.headline}>Education</div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={newEducation}
          onChange={(e) => setNewEducation(e.target.value)}
          className={styles.inputWrapper}
        />
      </div>
      <div className={styles.headline}>Languages</div>
      <p>Select language</p>
      {languages
        ? languages.map((language) => (
            <Tag
              name={language.name}
              value={language}
              onClick={addLanguage}
              isActive={newLanguages.some((e) => e._id === language._id)}
            />
          ))
        : null}
      <p>Choose your salary</p>
      <SalarySlider value={newSalary} onChange={(s) => setNewSalary(s)} />
      <input type="button" onClick={updateUser} value="Save" className={styles.saveButton} />
    </div>
  );
};

export default ProfileEdit;
