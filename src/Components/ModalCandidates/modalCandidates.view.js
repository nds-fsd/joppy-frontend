/* eslint-disable */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ReactComponent as HalfLogo } from '../../Images/Spinner.svg';
import { API_URL } from '../../Routers/routers';
import { getUserToken } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';
import CandidateProfileModal from '../CandidateProfileModal';
import Modal from '../Modal';
import ChatModal from '../ChatModal';
import styles from './modalCandidates.module.css';
import { useChatContext } from '../../Contexts/chatContext';

const ModalCandidates = ({ offer, handleClose }) => {
  const [candidatesList, setCandidatesList] = useState();
  const [trigger, setTrigger] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [whichUserId, setWhichUserId] = useState();
  const { setActiveChat } = useChatContext();

  const handleAccept = (id) => {
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'apllication/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: JSON.stringify({ companyAccepted: true }),
    };

    fetchMeStuff(`${API_URL}/offerstatus/${id}`, options, () => setTrigger(!trigger));
  };

  const handleReject = (id) => {
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'apllication/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: JSON.stringify({ companyRejected: true }),
    };

    fetchMeStuff(`${API_URL}/offerstatus/${id}`, options, () => setTrigger(!trigger));
  };

  const handleSeeCandidate = (candidateId) => {
    setOpenModal(true);
    setWhichUserId(candidateId);
  };

  const handleOpenChat = (candidateId) => {
    const options2 = {
      method: 'POST',
      headers: new Headers({
        Accept: 'apllication/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: JSON.stringify({ chatMembers: [candidateId] }),
    };
    fetchMeStuff(`${API_URL}/chat/search`, options2, (responseExisting) => {
      if (responseExisting.length > 0) {
        setActiveChat(responseExisting[0]);
        setOpenChat(true);
        setWhichUserId(candidateId);
      } else {
        fetchMeStuff(`${API_URL}/chat`, options2, (responseNew) => {
          setActiveChat(responseNew);
          setOpenChat(true);
          setWhichUserId(candidateId);
        });
      }
    });
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setOpenChat(false);
    setWhichUserId(undefined);
  };

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
    fetchMeStuff(`${API_URL}/offerstatus/candidates`, options, setCandidatesList);
  }, [trigger]);
  return (
    <>
      {openModal && whichUserId && (
        <CandidateProfileModal handleClose={handleModalClose} userId={whichUserId} />
      )}
      {openChat && whichUserId && <ChatModal handleClose={handleModalClose} userId={whichUserId} />}
      {!openModal && !openChat && (
        <Modal style={{ width: '40vw', 'max-height': '90vh' }}>
          <div className={styles.container}>
            <div className={styles.wrapperContainer}>
              {candidatesList &&
                candidatesList.map((candidate) => {
                  let wrapperStyle = `${styles.rowWrapper}`;
                  if (candidate.companyAccepted === true) {
                    wrapperStyle = `${wrapperStyle} ${styles.companyAccepted}`;
                  } else if (candidate.companyRejected === true) {
                    wrapperStyle = `${wrapperStyle} ${styles.companyRejected}`;
                  }
                  return (
                    <div className={wrapperStyle}>
                      <p>{candidate.userId.name}</p>
                      <div className={styles.optionsDiv}>
                        {candidate.companyAccepted && (
                          <FontAwesomeIcon
                            icon="comments"
                            className={`${styles.icon} ${styles.user}`}
                            onClick={() => handleOpenChat(candidate.userId._id)}
                          />
                        )}
                        <FontAwesomeIcon
                          className={`${styles.icon} ${styles.user}`}
                          icon="user"
                          onClick={() => handleSeeCandidate(candidate.userId._id)}
                        />
                        {!candidate.companyAccepted && !candidate.companyRejected && (
                          <>
                            <FontAwesomeIcon
                              className={`${styles.icon} ${styles.accept}`}
                              icon="check"
                              onClick={() => handleAccept(candidate._id)}
                            />
                            <FontAwesomeIcon
                              className={`${styles.icon} ${styles.reject}`}
                              icon="times"
                              onClick={() => handleReject(candidate._id)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              {candidatesList && candidatesList.length === 0 && (
                <div className={styles.noCandidatesDiv}>
                  <div className={styles.halfLogoDiv}>
                    <HalfLogo className={styles.halfLogo} />
                  </div>
                  <p className={styles.noCandidates}>No candidates have liked this offer yet</p>
                </div>
              )}
            </div>
            <button type="button" onClick={handleClose} className={styles.closeButton}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalCandidates;
