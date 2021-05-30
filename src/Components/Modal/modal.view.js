import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, handleClose, style }) => (
  <div className={styles.wholeThing}>
    <div className={styles.overlay} />
    <div className={styles.modalBody} style={style}>
      {!children && (
        <button type="button" className={styles.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon="times" />
        </button>
      )}
      {children}
    </div>
  </div>
);

export default Modal;
