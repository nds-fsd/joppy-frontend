import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './buttonReject.module.css';

const ButtonReject = ({ icon, onClick }) => (
  <div className={styles.button_reject} onClick={onClick}>
    <FontAwesomeIcon icon={icon} className={styles.thumbs_down} />
    <p>Reject</p>
  </div>
);

export default ButtonReject;
