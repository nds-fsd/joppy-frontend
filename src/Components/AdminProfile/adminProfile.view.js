import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './adminProfile.module.css';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import FormBlock from '../FormBlock';
import Tag from '../Tag';
import AdminProfileModal from '../AdminProfileModal';

const AdminProfile = () => {
  const [userData, setUserData] = useState();
  const [openModal, setOpenModal] = useState(false);
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
  }, [openModal]);

  useEffect(() => {
    fetch('http://localhost:3001/city', authObject)
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch();
  }, []);

  const handleEdit = () => setOpenModal(!openModal);

  return (
    <div className={styles.adminProfile}>
      {userData ? (
        <>
          <FormBlock
            title="About the company"
            subtitle="blabla"
            icon={<FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />}
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
            subtitle="blabla"
            icon={<FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />}
          >
            <div>
              {userData
                ? userData.skills.map((skill) => <Tag name={skill.name.skill} isActive />)
                : null}
            </div>
          </FormBlock>
          <FormBlock
            title="Languages"
            subtitle="blabla"
            icon={<FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />}
          >
            <div>
              {userData
                ? userData.languages.map((language) => <Tag name={language.name} isActive />)
                : null}
            </div>
          </FormBlock>
          <FormBlock
            title="Statistics"
            subtitle="blabla"
            icon={<FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />}
          >
            <div>
              {userData
                ? userData.languages.map((language) => <Tag name={language.name} isActive />)
                : null}
            </div>
          </FormBlock>
          <FormBlock
            title="Media"
            subtitle="blabla"
            icon={<FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />}
          >
            <div>
              <img src={userData.photo} alt="user pic" className={styles.userPhoto} />
            </div>
          </FormBlock>
          <FormBlock
            title="User information"
            icon={<FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />}
          />
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
