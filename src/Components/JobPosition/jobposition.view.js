import React from 'react';
import styles from './jobposition.module.css';
import Tag from '../Tag';

const JobPosition = ({ offerData }) => (
  <div className={styles.jobPosition}>
    <div className={styles.offerTitle}>{offerData.title}</div>

    {offerData ? <Tag name="Salary" isActive /> : null}

    <p className={styles.headline}>They are searching for</p>
    {offerData ? offerData.position.map((position) => <Tag name={position.name} isActive />) : null}

    <p className={styles.headline}>Skills wanted</p>
    {offerData ? offerData.skills.map((skill) => <Tag name={skill.skill} isActive />) : null}
  </div>
);

export default JobPosition;
