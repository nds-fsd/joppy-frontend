import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './profilePage.module.css';
import { PROFILE_PAGE } from '../../Routers/routers'; //eslint-disable-line
import Profile from '../../Components/Profile';
import ProfileIntro from '../../Components/ProfileIntro';

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
    fetch('http://localhost:3001/user/60734d55bade0c33abeaea00', authObject)
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
        <Link to={PROFILE_PAGE}>Profile</Link>
        <span> | </span>
        <Link to={`${PROFILE_PAGE}/preferences`}>Preferences</Link>
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
    </div>
  );
};

export default ProfilePage;
