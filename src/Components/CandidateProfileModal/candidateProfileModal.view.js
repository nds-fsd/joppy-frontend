import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Routers/routers';
import { getUserToken } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';
import Modal from '../Modal';
import Profile from '../Profile';
import ProfileIntro from '../ProfileIntro';
import styles from './candidateProfileModal.module.css'; // eslint-disable-line

const CandidateProfileModal = ({ handleClose, userId }) => {
  const [userData, setUserData] = useState();

  const options = {
    headers: new Headers({
      Accept: 'apllication/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    }),
    mode: 'cors',
  };

  useEffect(() => {
    fetchMeStuff(`${API_URL}/user/${userId}`, options, setUserData);
  }, []);
  return (
    <Modal handleClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          {userData && (
            <>
              <ProfileIntro
                userData={userData}
                style1={{
                  display: 'flex',
                  'flex-direction': 'column',
                  'align-items': 'center',
                  'box-shadow': 'none',
                }}
                style2={{ visibility: 'hidden' }}
              />
              <Profile
                userData={userData}
                style={{ width: '90%', margin: 'none', padding: 'none', 'box-shadow': 'none' }}
              />
            </>
          )}
        </div>
        <button className={styles.closeButton} type="button" onClick={handleClose}>
          Back
        </button>
      </div>
    </Modal>
  );
};

export default CandidateProfileModal;
