import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profilePage.module.css';
import { PROFILE_PAGE } from '../../Routers/routers'; //eslint-disable-line
import Profile from '../../Components/Profile';
import ProfileIntro from '../../Components/ProfileIntro';
import ProfileEdit from '../../Components/ProfileEdit';
import { ReactComponent as Plant } from '../../Images/plant.svg';
import { getUserToken } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';
import UserContext from '../../Contexts/userContext';

const ProfilePage = () => {
  const userData = useContext(UserContext);
  const [userDataRaw, setUserDataRaw] = useState();
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [positions, setPositions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const handleEdit = () => setOpenEdit(!openEdit);
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
      {userData && userDataRaw ? (
        <>
          <ProfileIntro userData={userData} locations={locations} />
          <div className={styles.profileNavBar}>
            <Link to={PROFILE_PAGE} className={styles.link}>
              Profile
            </Link>
            <FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />
            <Link to={`${PROFILE_PAGE}/myoffers`} className={styles.link}>
              My Offers
            </Link>
          </div>
          <Router>
            <Switch>
              <Route path={PROFILE_PAGE}>
                {openEdit ? (
                  <ProfileEdit
                    userDataRaw={userDataRaw}
                    skills={skills}
                    positions={positions}
                    languages={languages}
                    close={openEdit}
                  />
                ) : (
                  <Profile userData={userData} />
                )}
              </Route>
              <Route path={`${PROFILE_PAGE}/myoffers`}>
                <p>AQUI VAN OFFERS</p>
              </Route>
            </Switch>
          </Router>
        </>
      ) : (
        <p>loading...</p>
      )}
      <Plant className={styles.plant} />
    </div>
  );
};

export default ProfilePage;
