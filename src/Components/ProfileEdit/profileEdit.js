import React, { useState } from 'react';
import styles from './profileEdit.module.css';
import { getSessionUser, getUserToken } from '../../Utils/Auth';
import Tag from '../Tag';
import ProfileList from '../ProfileList';
import SalarySlider from '../SalarySlider';

const ProfileEdit = ({ userDataRaw, skills, positions, languages, close }) => {
  const closeThis = () => {
    close(false);
  };
  const userSession = getSessionUser();
  const [newEducation, setNewEducation] = useState(userDataRaw.education);
  const [newWorkExperiences, setNewWorkExperiences] = useState(userDataRaw.workExperiences);
  const [newSalary, setNewSalary] = useState(userDataRaw.salary);
  const [newLanguages, setNewLanguages] = useState(userDataRaw.languages);
  const [newSkills, setNewSkills] = useState(userDataRaw.skills);
  const [newPositions, setNewPositions] = useState(userDataRaw.positions);
  const updatedUser = {
    skills: newSkills,
    positions: newPositions,
    salary: newSalary,
    languages: newLanguages,
    workExperiences: newWorkExperiences,
    education: newEducation,
  };

  const updateUser = () => {
    const url = `http://localhost:3001/user/${userSession.id}`;
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
        .catch();
    }
    closeThis();
  };

  const addSkill = (selSkill) => {
    if (newSkills.some((s) => s.name === selSkill)) {
      setNewSkills([...newSkills.filter((skill) => skill.name !== selSkill)]);
    } else {
      setNewSkills([...newSkills, { name: selSkill, years: '1' }]);
    }
  };
  const addSkillYears = (y, ski) => {
    const skillYears = [...newSkills];
    const objIndex = skillYears.findIndex((skill) => skill.name === ski.name);
    skillYears[objIndex].years = y;
    setNewSkills(skillYears);
  };

  const addPosition = (selPosition) => {
    if (!newPositions.some((e) => e.name === selPosition) && newPositions.length === 3) {
      return;
    }
    if (newPositions.some((e) => e.name === selPosition)) {
      setNewPositions([...newPositions.filter((e) => e.name !== selPosition)]);
    } else {
      setNewPositions([...newPositions, { name: selPosition, years: '1' }]);
    }
  };
  const addPositionYears = (y, pos) => {
    const positionYears = [...newPositions];
    const objIndex = positionYears.findIndex((position) => position.name === pos.name);
    positionYears[objIndex].years = y;
    setNewPositions(positionYears);
  };

  const addLanguage = (selLanguage) => {
    if (
      newLanguages.some(
        (language) => language === selLanguage._id || language._id === selLanguage._id
      )
    ) {
      setNewLanguages([
        ...newLanguages.filter(
          (language) => language._id !== selLanguage._id && language !== selLanguage._id
        ),
      ]);
    } else {
      setNewLanguages([...newLanguages, selLanguage]);
    }
  };

  const nameById = (id, arr, attribute) => {
    const object = arr.find((item) => item._id === id);
    return object[attribute];
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
                isActive={newPositions.some((e) => e.name === position._id)}
              />
            ))
          : null}
      </div>
      <p>Use the slider to select your years of experience with each</p>
      <div className={styles.itemSlider}>
        {newPositions
          ? newPositions.map((position) => (
              <>
                <Tag name={nameById(position.name, positions, 'name')} isActive />
                <input
                  type="range"
                  min="0"
                  max="11"
                  step="1"
                  value={position.years}
                  onChange={(e) => addPositionYears(e.target.value, position)}
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
                value={skill._id}
                onClick={addSkill}
                isActive={newSkills.some((e) => e.name === skill._id)}
              />
            ))
          : null}
      </div>
      <p>Use the slider to select your years of experience with each</p>
      <div className={styles.itemSlider}>
        {newSkills
          ? newSkills.map((skill) => (
              <>
                <Tag name={nameById(skill.name, skills, 'skill')} isActive />
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
      <ProfileList
        array={userDataRaw.workExperiences}
        newArray={(value) => setNewWorkExperiences(value)}
      />
      <div className={styles.headline}>Education</div>
      <ProfileList array={userDataRaw.education} newArray={(value) => setNewEducation(value)} />
      <div className={styles.headline}>Languages</div>
      <p>Select language</p>
      {languages
        ? languages.map((language) => (
            <Tag
              name={language.name}
              value={language}
              onClick={addLanguage}
              isActive={newLanguages.some((e) => e === language._id || e._id === language._id)}
            />
          ))
        : null}
      <p>Choose your salary</p>
      <SalarySlider style={{ width: '25vw' }} value={newSalary} onChange={(s) => setNewSalary(s)} />
      <input
        type="button"
        onClick={() => {
          updateUser();
        }}
        value="Save"
        className={styles.saveButton}
      />
    </div>
  );
};

export default ProfileEdit;
