import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profilePage.module.css';
import Profile from '../../Components/Profile';
import ProfileIntro from '../../Components/ProfileIntro';
import ProfileEdit from '../../Components/ProfileEdit';
import MyOffers from '../../Components/MyOffers';
import { ReactComponent as Plant } from '../../Images/plant.svg';
import { getUserToken } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';
import UserContext from '../../Contexts/userContext';

const ProfilePage = () => {
  const { userInfo } = useContext(UserContext);
  const [userDataRaw, setUserDataRaw] = useState();
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [positions, setPositions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const handleEdit = () => {
    setOpenEdit(!openEdit);
    setOpenChat(false);
  };
  const handleChat = () => {
    setOpenChat(!openChat);
    setOpenEdit(false);
  };
  const handleProfile = () => {
    setOpenEdit(false);
    setOpenChat(false);
  };
  console.log(openChat);
  const userToken = getUserToken();
  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  };
  useEffect(() => {
    if (getUserToken()) {
      fetchMeStuff('http://localhost:3001/skill', authObject, setSkills);
      fetchMeStuff('http://localhost:3001/position', authObject, setPositions);
      fetchMeStuff('http://localhost:3001/language', authObject, setLanguages);
      fetchMeStuff('http://localhost:3001/city', authObject, setLocations);
    }
  }, []);

  useEffect(() => {
    const url = 'http://localhost:3001/verify/raw';
    fetch(url, authObject)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((d) => {
        setUserDataRaw(d);
      })
      .catch();
  }, []);

  return (
    <div className={styles.profilePage}>
      {userInfo && userDataRaw ? (
        <>
          <ProfileIntro userData={userInfo} locations={locations} />
          <div className={styles.profileNavBar}>
            <input type="button" className={styles.link} onClick={handleProfile} value="Profile" />
            <FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />
            <input type="button" className={styles.link} onClick={handleChat} value="My Offers" />
          </div>
          {!openEdit && !openChat ? <Profile userData={userInfo} /> : null}
          {openEdit ? (
            <ProfileEdit
              userDataRaw={userDataRaw}
              skills={skills}
              positions={positions}
              languages={languages}
              close={handleEdit}
            />
          ) : null}
          {openChat ? <MyOffers userData={userInfo} closeChat={handleChat} /> : null}
        </>
      ) : (
        <p>loading...</p>
      )}
      <Plant className={styles.plant} />
    </div>
  );
};

export default ProfilePage;
