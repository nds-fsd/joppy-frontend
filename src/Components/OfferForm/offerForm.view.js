import React, { useState, useEffect } from 'react';
import { fetchMeStuff } from '../../Utils/functions';
// import FormBlock from '../FormBlock';
import SalarySlider from '../SalarySlider';
import styles from './offerForm.module.css';

const OfferForm = () => {
  const [skillData, setSkillData] = useState([]); //eslint-disable-line
  const [positionData, setPositionData] = useState([]); //eslint-disable-line
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

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <label>
          Title
          <input type="text" onChange={(t) => setOfferData({ ...offerData, title: t })} />
        </label>
        <label>
          Description
          <input type="text" onChange={(d) => setOfferData({ ...offerData, description: d })} />
        </label>
      </div>
      <div className={styles.block}>
        <SalarySlider
          style={{ width: '10vw' }}
          value={offerData.salary}
          onChange={(s) => setOfferData({ ...offerData, salary: s })}
        />
      </div>
    </div>
  );
};

export default OfferForm;
