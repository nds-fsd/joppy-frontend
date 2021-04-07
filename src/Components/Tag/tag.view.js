import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './tag.module.css';

const Tag = ({ icon, children, match }) => (
  <div className={styles.tagContainer}>
    {icon && (
      <span className={styles.tagIcon}>
        <FontAwesomeIcon icon={icon} />
      </span>
    )}

    <span className={styles.tagChildren}>{children}</span>

    {match && (
      <span className={styles.tagCheck}>
        <FontAwesomeIcon icon="check" />
      </span>
    )}
  </div>
);

export default Tag;
