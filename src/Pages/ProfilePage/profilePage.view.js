import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './profilePage.module.css';
import { PROFILE_PAGE } from '../../Routers/routers'; //eslint-disable-line
import Profile from '../../Components/Profile';
import ProfileIntro from '../../Components/ProfileIntro';
import { ReactComponent as Plant } from '../../Images/plant.svg';

const ProfilePage = () => {
  const [userData, setUserData] = useState();

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
    },
  };

  useEffect(() => {
    fetch('http://localhost:3001/user/60841b03bd945a22ea17224a', authObject)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch();
  }, []);

  return (
    <div className={styles.profilePage}>
      <ProfileIntro userData={userData} />
      <div className={styles.profileNavBar}>
        <Link to={PROFILE_PAGE} className={styles.link}>
          Profile
        </Link>
        <Link to={`${PROFILE_PAGE}/preferences`} className={styles.link}>
          Preferences
        </Link>
      </div>
      <Router>
        <Switch>
          <Route path={PROFILE_PAGE}>
            <Profile userData={userData} />
          </Route>
          <Route path={`${PROFILE_PAGE}/preferences`}>
            <p>Preferr</p>
          </Route>
        </Switch>
      </Router>
      <Plant className={styles.plant} />
    </div>
  );
};

export default ProfilePage;
