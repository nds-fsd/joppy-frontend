import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './tag.module.css';

const Tag = ({ name, icon, match, value, onClick, isActive }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <div
      className={!isActive ? styles.tagContainer : styles.tagContainerActive}
      onClick={handleClick}
    >
      {icon && (
        <span className={styles.tagIcon}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}

      <div className={styles.tagChildren}>{name}</div>

      {match && (
        <span className={styles.tagCheck}>
          <FontAwesomeIcon icon="check" />
        </span>
      )}

      {isActive && (
        <span className={styles.tagCross}>
          <FontAwesomeIcon icon="times" />
        </span>
      )}
    </div>
  );
};

export default Tag;
