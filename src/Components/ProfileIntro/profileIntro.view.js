import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profileIntro.module.css';
import AdminProfileModal from '../AdminProfileModal';

const ProfileIntro = ({ userData, locations, style1, style2 }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleEditModal = () => setOpenModal(!openModal);
  console.log(userData);
  return (
    <div className={styles.profileIntro} style={style1}>
      <FontAwesomeIcon
        icon="edit"
        style={style2}
        className={styles.icon}
        onClick={handleEditModal}
      />
      {userData.logo ? (
        <img src={userData.logo} alt="user pic" className={styles.userPhoto} />
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5E-CamT4OlC0jnxA1uqQXKdYXxDv-gak56Q&usqp=CAU"
          alt="company logo"
          className={styles.userPhoto}
        />
      )}
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
