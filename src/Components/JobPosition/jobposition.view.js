import React from 'react';
import styles from './jobposition.module.css';
import Tag from '../Tag';

const JobPosition = ({ icon, offerData, match }) => (
  <div className={styles.jobtag}>
    <h2>Software Engineer</h2>
    <Tag icon={icon} match={match}>
      {children}
    </Tag>
    <p>Searching for</p>
    <Tag icon={icon} match={match}>
      {children}
    </Tag>
    <p>Knowing</p>
    <Tag icon={icon} match={match}>
      {children}
    </Tag>
  </div>
);

export default JobPosition;
