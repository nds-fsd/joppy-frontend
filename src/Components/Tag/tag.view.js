import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './tag.module.css';

const Tag = ({ icon, skill, match }) => {
  console.log(skill);

  return (
    <div className={styles.tagContainer}>
      {icon && (
        <span className={styles.tagIcon}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}

      {skill ? <span className={styles.tagChildren}>{skill}</span> : null}

      {match && (
        <span className={styles.tagCheck}>
          <FontAwesomeIcon icon="check" />
        </span>
      )}
    </div>
  );
};

export default Tag;
