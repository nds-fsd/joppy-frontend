import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './buttonShare.module.css';

const ButtonShare = ({ icon, onClick }) => (
  <div className={styles.button_share} onClick={onClick}>
    <FontAwesomeIcon icon={icon} className={styles.share} />
    <p>Share</p>
  </div>
);

export default ButtonShare;
