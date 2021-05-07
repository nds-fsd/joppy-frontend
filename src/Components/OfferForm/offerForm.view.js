import React, { useState, useEffect } from 'react';
import { fetchMeStuff } from '../../Utils/functions';
import InputText from '../InputText';
import SalarySlider from '../SalarySlider';
import Tag from '../Tag';
import styles from './offerForm.module.css';

const OfferForm = ({ handleClose, handleOfferCreated }) => {
  const [skillData, setSkillData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [offerData, setOfferData] = useState({
    title: '',
    salary: '40000',
    city: '',
    position: '',
    skills: [],
    description: '',
  });

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
    },
  };

  useEffect(() => {
    fetchMeStuff('http://localhost:3001/skill', authObject, setSkillData);
    fetchMeStuff('http://localhost:3001/position', authObject, setPositionData);
  }, []);

  const addSkill = (skillId) => {
    if (offerData.skills.includes(skillId)) {
      setOfferData({ ...offerData, skills: [...offerData.skills.filter((s) => s !== skillId)] });
    } else {
      setOfferData({ ...offerData, skills: [...offerData.skills, skillId] });
    }
  };

  const addPosition = (positionId) => {
    if (offerData.position === positionId) {
      setOfferData({ ...offerData, position: '' });
    } else {
      setOfferData({ ...offerData, position: positionId });
    }
  };

  const handleSubmit = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        Accept: 'apllication/json',
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
      }),
      mode: 'cors',
      body: JSON.stringify(offerData),
    };

    fetchMeStuff('http://localhost:3001/offer', options, handleOfferCreated);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <p className={styles.mainTitle}>Create a new offer</p>
        <InputText
          labelText="Offer title"
          width="20vw"
          handleOnChange={(text) => setOfferData({ ...offerData, title: text })}
        />
        <InputText
          labelText="Offer description"
          width="30vw"
          handleOnChange={(des) => setOfferData({ ...offerData, description: des })}
        />
      </div>

      <div className={styles.formSection}>
        <p className={styles.formSectionTitle}>Annual salary</p>
        <p className={styles.formSectionSubtitle}>Candidates will not see this amount</p>
        <SalarySlider
          style={{ width: '20vw' }}
          value={offerData.salary}
          onChange={(s) => setOfferData({ ...offerData, salary: s })}
        />
      </div>
      <div className={styles.formSection}>
        <p className={styles.formSectionTitle}>Position of the offer</p>
        <p className={styles.formSectionSubtitle}>Choose one from the list</p>
        <div className={styles.tagContainer}>
          {positionData &&
            positionData.map((item) => (
              <Tag
                name={item.name}
                onClick={addPosition}
                value={item._id}
                isActive={offerData.position === item._id}
              />
            ))}
        </div>
      </div>
      <div className={styles.formSection}>
        <p className={styles.formSectionTitle}>Skills required</p>
        <p className={styles.formSectionSubtitle}>Choose all that apply</p>
        <div className={styles.tagContainer}>
          {skillData &&
            skillData.map((item) => (
              <Tag
                name={item.skill}
                onClick={addSkill}
                value={item._id}
                isActive={offerData.skills.includes(item._id)}
              />
            ))}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} type="button" onClick={handleClose}>
          Cancel
        </button>
        <button className={styles.createButton} type="button" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default OfferForm;
