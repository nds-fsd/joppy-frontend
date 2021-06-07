import React, { useState } from 'react';
// import {Image} from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profileIntro.module.css';
import AdminProfileModal from '../AdminProfileModal';

const ProfileIntro = ({ userData, locations, style1, style2, refresh }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleEditModal = () => setOpenModal(!openModal);

  // {imageUrl && (
  //   <img src={imageUrl} alt={imageAlt} className={styles.photo}/>
  // )}

  return (
    <div className={styles.profileIntro} style={style1}>
      <FontAwesomeIcon
        icon="edit"
        style={style2}
        className={styles.icon}
        onClick={handleEditModal}
      />
      {userData.photo[0] !== undefined ? (
        <img src={userData.photo[0]} alt="user pic" className={styles.userPhoto} />
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
          refresh={refresh}
        />
      ) : null}
    </div>
  );
};

export default ProfileIntro;
