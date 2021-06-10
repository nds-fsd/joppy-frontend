import React from 'react';
import Modal from '../Modal';
import styles from './modalViewOffer.module.css';
import JobOffer from '../JobOffer';

const ModalViewOffer = ({ offerId, handleClose }) => (
  <Modal style={{ 'max-height': '90vh' }}>
    <div className={styles.container}>
      <div className={styles.offerContainer}>
        <p className={styles.title}>This is what candidates will see</p>
        <JobOffer offerInfo={offerId} />
      </div>
      <button type="button" onClick={handleClose} className={styles.closeButton}>
        Close
      </button>
    </div>
  </Modal>
);

export default ModalViewOffer;
