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
  faMapMarkerAlt,
  faEuroSign,
  faComments,
  faEnvelope,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
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
// import Loader from './Components/Loader';

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
  faTimes,
  faEdit,
  faSearch,
  faMapMarkerAlt,
  faEuroSign,
  faEnvelope,
  faComments,
  faTrashAlt
);

function App() {
  const [userInfo, setUserInfo] = useState();
  const value = { userInfo, setUserInfo };

  useEffect(() => {
    // const userRole = getSessionUserRole();
    const userToken = getUserToken();
    if (userToken) {
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
    <Router>
      <UserContext.Provider value={value}>
        <div className={styles.App}>
          <Switch>
            <Route path={REGISTER_PAGE}>{userInfo ? <Redirect to="/" /> : <RegisterPage />}</Route>
            <Route path={LOGIN_PAGE}>{userInfo ? <Redirect to="/" /> : <LoginPage />}</Route>
            <Route path={ADMIN_PAGE}>{userInfo ? <AdminPage /> : <h1>Nope</h1>}</Route>
            <div className={styles.main}>
              <Route exact path={PROFILE_PAGE}>
                <NavBar />
                <ProfilePage />
              </Route>
              <Route exact path={OFFER_PAGE}>
                <NavBar />
                <OfferPage />
              </Route>
              <Route path="/">
                <h1>404</h1>
              </Route>
            </div>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
