import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profileIntro.module.css';
import AdminProfileModal from '../AdminProfileModal';

const ProfileIntro = ({ userData, locations }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleEditModal = () => setOpenModal(!openModal);
  console.log(userData);
  return (
    <div className={styles.profileIntro}>
      <FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEditModal} />
      {userData ? <img src={userData.logo} alt="user pic" className={styles.userPhoto} /> : null}
      {userData ? <p className={styles.userName}>{userData.name}</p> : null}
      {userData.location ? <p className={styles.userIntro}>{userData.location.name}.</p> : null}
      {openModal ? (
        <AdminProfileModal
          open={openModal}
          close={() => setOpenModal(false)}
          userData={userData}
          locations={locations}
        />
      ) : null}
    </div>
  );
};

export default ProfileIntro;
