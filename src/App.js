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
  faEdit,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { getUserToken } from './Utils/Auth';
import styles from './App.css';
import { OFFER_PAGE, PROFILE_PAGE, REGISTER_PAGE, LOGIN_PAGE, ADMIN_PAGE } from './Routers/routers'; //eslint-disable-line
import OfferPage from './Pages/OfferPage';
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import NavBar from './Components/NavBar';
import AdminPage from './Pages/AdminPage';
import UserContext from './Contexts/userContext';
import { fetchMeStuff } from './Utils/functions';

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
  faTimes,
  faEdit,
  faSearch
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const userToken = getUserToken();
    if (userToken) {
      setIsLoggedIn(true);
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      };
      fetchMeStuff('http://localhost:3001/verify', options, setUserInfo);
    }
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      <Router>
        <div className={styles.App}>
          <Switch>
            <Route path={REGISTER_PAGE}>
              {isLoggedIn ? <Redirect to="/" /> : <RegisterPage />}
            </Route>
            <Route path={LOGIN_PAGE}>{isLoggedIn ? <Redirect to="/" /> : <LoginPage />}</Route>
            <Route path={ADMIN_PAGE}>{userInfo ? <AdminPage /> : <h1>Nope</h1>}</Route>
            <div>
              <NavBar />
              <div className={styles.main}>
                <Switch>
                  <Route exact path={OFFER_PAGE}>
                    <OfferPage />
                  </Route>
                  <Route path={PROFILE_PAGE}>
                    <ProfilePage />
                  </Route>
                </Switch>
              </div>
            </div>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
