import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './adminProfile.module.css';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';
import FormBlock from '../FormBlock';
import Tag from '../Tag';
import AdminProfileModal from '../AdminProfileModal';
import AdminProfSkills from '../AdminProfSkills';
import AdminProfLanguages from '../AdminProfLanguages';

const AdminProfile = () => {
  const [userData, setUserData] = useState();
  const [locations, setLocations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  const handleEditModal = () => setOpenModal(!openModal);
  const handleEditSkills = () => setOpenSkills(!openModal);
  const handleEditLanguages = () => setOpenLanguages(!openModal);
  const userSession = getSessionUser();
  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  };
  const url = `http://localhost:3001/user/${userSession.id}`;

  useEffect(() => {
    fetch(url, authObject)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch();
  }, [openModal, openSkills, openLanguages]);

  useEffect(() => {
    fetchMeStuff('http://localhost:3001/city', authObject, setLocations);
  }, []);

  return (
    <div className={styles.adminProfile}>
      {userData ? (
        <>
          <FormBlock
            title="About the company"
            icon={<FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEditModal} />}
          >
            {userData.photo[0] ? (
              <img src={userData.photo[0]} alt="company logo" className={styles.logo} />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5E-CamT4OlC0jnxA1uqQXKdYXxDv-gak56Q&usqp=CAU"
                alt="company logo"
                className={styles.logo}
              />
            )}
            <div className={styles.name}>{userData.name}</div>
            {userData.location ? (
              <div className={styles.firstBlock}>{userData.location.name}</div>
            ) : null}
            <div className={styles.firstBlock}>{userData.bio}</div>
          </FormBlock>
          <FormBlock
            title="Main tech stack"
            icon={
              <FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEditSkills} />
            }
          >
            {openSkills ? (
              <AdminProfSkills userSkills={userData.tech} close={() => setOpenSkills(false)} />
            ) : (
              <div>
                {userData
                  ? userData.tech.map((skill) => <Tag name={skill.skill} isActive />)
                  : null}
              </div>
            )}
          </FormBlock>
          <FormBlock
            title="Languages"
            icon={
              <FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEditLanguages} />
            }
          >
            {openLanguages ? (
              <AdminProfLanguages
                userLanguages={userData.languages}
                close={() => setOpenLanguages(false)}
              />
            ) : (
              <div>
                {userData
                  ? userData.languages.map((language) => <Tag name={language.name} isActive />)
                  : null}
              </div>
            )}
          </FormBlock>
          <FormBlock title="Media" icon={<FontAwesomeIcon icon="edit" className={styles.icon} />}>
            <div>
              <img src={userData.photo} alt="user pic" className={styles.userPhoto} />
            </div>
          </FormBlock>
          <AdminProfileModal
            open={openModal}
            close={() => setOpenModal(false)}
            userData={userData}
            locations={locations}
          />
        </>
      ) : null}
    </div>
  );
};

export default AdminProfile;
