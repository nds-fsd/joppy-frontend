import React from 'react';
import Modal from '../Modal';
import OfferForm from '../OfferForm/offerForm.view';
import styles from './modalCreateOffer.module.css';

const ModalCreateOffer = ({ handleClose, handleOfferCreated }) => (
  <Modal handleClose={handleClose}>
    <div className={styles.container}>
      <OfferForm handleClose={handleClose} handleOfferCreated={handleOfferCreated} />
    </div>
  </Modal>
);

export default ModalCreateOffer;
