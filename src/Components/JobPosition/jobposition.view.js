import React from 'react';
import styles from './jobposition.module.css';
import Tag from '../Tag';

const JobPosition = ({ icon, offerData, match }) => (
  <div className={styles.jobPosition}>
    <div className={styles.offerTitle}>{offerData.title}</div>
    <Tag icon={icon} match={match}>
      {offerData.city}
    </Tag>
    <Tag icon={icon} match={match}>
      {offerData.salary}
    </Tag>
    <p className={styles.headline}>They are searching for</p>
    <Tag icon={icon} match={match}>
      {offerData.position}
    </Tag>
    <p className={styles.headline}>Skills wanted</p>
    <Tag icon={icon} match={match}>
      {offerData.skills}
    </Tag>
  </div>
);

export default JobPosition;
