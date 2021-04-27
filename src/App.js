import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faBuilding,
  faHome,
  faUniversity,
  faMoneyBillWave,
  faClock,
  faLaptopHouse,
  faThumbsUp,
  faThumbsDown,
  faHistory,
  faShare,
  faUser,
  faCircleNotch,
  faLayerGroup,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { getUserToken } from './Utils/Auth';
import styles from './App.css';
import {
  OFFER_PAGE,
  PROFILE_PAGE,
  CHALLENGES_PAGE,
  CONVERSATIONS_PAGE,
  REGISTER_PAGE,
  LOGIN_PAGE,
} from './Routers/routers'; //eslint-disable-line
import OfferPage from './Pages/OfferPage/offerPage.view';
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import NavBar from './Components/NavBar';

library.add(
  faCheck,
  faBuilding,
  faHome,
  faUniversity,
  faMoneyBillWave,
  faClock,
  faLaptopHouse,
  faThumbsUp,
  faThumbsDown,
  faHistory,
  faShare,
  faUser,
  faCircleNotch,
  faLayerGroup,
  faCommentAlt,
  faTimes
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = getUserToken();
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route path={REGISTER_PAGE}>{isLoggedIn ? <Redirect to="/" /> : <RegisterPage />}</Route>
          <Route path={LOGIN_PAGE}>{isLoggedIn ? <Redirect to="/" /> : <LoginPage />}</Route>
          <div className={styles.container}>
            <NavBar />
            <div className={styles.main}>
              <Switch>
                <Route exact path={OFFER_PAGE}>
                  <OfferPage />
                </Route>
                <Route path={PROFILE_PAGE}>
                  <ProfilePage />
                </Route>
                <Route path={CHALLENGES_PAGE}>
                  <h1>Challenges</h1>
                </Route>
                <Route path={CONVERSATIONS_PAGE}>
                  <h1>Conversations</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
