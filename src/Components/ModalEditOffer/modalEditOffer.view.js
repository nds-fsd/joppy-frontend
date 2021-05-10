import React from 'react';
import Modal from '../Modal';
import OfferForm from '../OfferForm/offerForm.view';
import styles from './modalEditOffer.module.css';

const ModalEditOffer = ({ handleClose, offerId, handleOfferEdit }) => (
  <Modal handleClose={handleClose}>
    <div className={styles.container}>
      <OfferForm handleClose={handleClose} offerId={offerId} handleOfferCreated={handleOfferEdit} />
    </div>
  </Modal>
);

export default ModalEditOffer;
