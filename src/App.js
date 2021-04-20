import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route path={REGISTER_PAGE}>
            <RegisterPage />
          </Route>
          <Route path={LOGIN_PAGE}>
            <LoginPage />
          </Route>
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
