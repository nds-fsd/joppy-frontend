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
  const [openModal, setOpenModal] = useState(false);
  const handleEditModal = () => setOpenModal(!openModal);
  const [openSkills, setOpenSkills] = useState(false);
  const handleEditSkills = () => setOpenSkills(!openModal);
  const [openLanguages, setOpenLanguages] = useState(false);
  const handleEditLanguages = () => setOpenLanguages(!openModal);

  const [locations, setLocations] = useState([]);
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
            <div>
              <img src={userData.logo} alt="user pic" className={styles.logo} />
            </div>
            <div className={styles.name}>{userData.name}</div>
            <div className={styles.firstBlock}>{userData.location.name}</div>
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
        </>
      ) : null}

      <AdminProfileModal
        open={openModal}
        close={() => setOpenModal(false)}
        userData={userData}
        locations={locations}
      />
    </div>
  );
};

export default AdminProfile;
