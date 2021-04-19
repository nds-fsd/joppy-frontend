import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './tag.module.css';

const Tag = ({ icon, id, skill, role, city, match, getValue, clickable }) => (
  <div className={styles.tagContainer}>
    {icon && (
      <span className={styles.tagIcon}>
        <FontAwesomeIcon icon={icon} />
      </span>
    )}

    {skill ? (
      <div
        className={styles.tagChildren}
        onClick={() => {
          if (clickable) getValue({ skill, id });
        }}
      >
        {skill}
      </div>
    ) : null}
    {role ? (
      <span
        className={styles.tagChildren}
        onClick={() => {
          if (clickable) getValue({ role, id });
        }}
      >
        {role}
      </span>
    ) : null}
    {city ? (
      <span
        className={styles.tagChildren}
        onClick={() => {
          if (clickable) getValue({ city, id });
        }}
      >
        {city}
      </span>
    ) : null}

    {match && (
      <span className={styles.tagCheck}>
        <FontAwesomeIcon icon="check" />
      </span>
    )}
  </div>
);

export default Tag;
