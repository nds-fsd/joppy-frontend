/* eslint-disable no-nested-ternary */

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
      className={
        isActive
          ? styles.tagContainerActive
          : match
          ? styles.tagContainerMatch
          : styles.tagContainer
      }
      onClick={handleClick}
    >
      {icon && (
        <span className={match ? styles.tagIconMatch : styles.tagIcon}>
          <FontAwesomeIcon icon={icon} size="sm" />
        </span>
      )}

      <div className={styles.tagChildren}>{name}</div>

      {match && (
        <span className={styles.tagCheck}>
          <FontAwesomeIcon icon="check" />
        </span>
      )}
    </div>
  );
};

export default Tag;
