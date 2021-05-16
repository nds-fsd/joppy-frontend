import React, { useEffect, useState } from 'react';
import { getUserToken } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';
import Modal from '../Modal';
import styles from './modalCandidates.module.css';

const ModalCandidates = ({ offer, handleClose }) => {
  const [candidatesList, setCandidatesList] = useState();

  const options = {
    method: 'POST',
    headers: new Headers({
      Accept: 'apllication/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    }),
    mode: 'cors',
    body: JSON.stringify({ offerId: offer }),
  };

  useEffect(() => {
    fetchMeStuff('http://localhost:3001/offerstatus/candidates', options, setCandidatesList);
  }, []);
  return (
    <Modal>
      <div className={styles.container}>
        {candidatesList && candidatesList.map((candidate) => <p>{candidate.userId.name}</p>)}
        {candidatesList && candidatesList.length === 0 && (
          <p>No candiates have liked this offer yet</p>
        )}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ModalCandidates;
