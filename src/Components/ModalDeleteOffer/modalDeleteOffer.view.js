import React from 'react';
import Modal from '../Modal';
import { fetchMeStuff } from '../../Utils/functions';
import styles from './modalDeleteOffer.module.css';
import { API_URL } from '../../Routers/routers';

const ModalDeleteOffer = ({ handleClose, offerId, handleOfferDeleted }) => {
  const handleDelete = () => {
    const options = {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'apllication/json',
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
      }),
      mode: 'cors',
    };

    fetchMeStuff(`${API_URL}/offer/${offerId}`, options, handleOfferDeleted);
  };
  return (
    <Modal handleClose={handleClose}>
      <div className={styles.container}>
        <p className={styles.title}>Are you sure you want to delete this offer?</p>
        <>
          <button className={styles.cancelButton} type="button" onClick={handleClose}>
            Cancel
          </button>
          <button
            className={`${styles.cancelButton} ${styles.deleteButton}`}
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      </div>
    </Modal>
  );
};

export default ModalDeleteOffer;
