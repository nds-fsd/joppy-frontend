import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './button.module.css';

const Button = ({ icon, onClick, handle, className }) => (
  <div className={className} onClick={onClick}>
    <FontAwesomeIcon icon={icon} className={styles.icon} />
    <p>{handle}</p>
  </div>
);

export default Button;
