import React, { useEffect, useState } from 'react';
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
  faEdit,
  faSearch,
  faMapMarkerAlt,
  faEuroSign,
  faComments,
  faEnvelope,
  faTrashAlt,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { getUserToken } from './Utils/Auth';
import './App.css';
import { OFFER_PAGE, PROFILE_PAGE, REGISTER_PAGE, LOGIN_PAGE, ADMIN_PAGE } from './Routers/routers'; //eslint-disable-line
import OfferPage from './Pages/OfferPage';
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import NavBar from './Components/NavBar';
import AdminPage from './Pages/AdminPage';
import UserContext from './Contexts/userContext';
import { fetchMeStuff } from './Utils/functions';
import { API_URL } from './Routers/routers'; //eslint-disable-line
import Loader from './Components/Loader';
import NotFound from './Pages/NotFound';

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
  faTrashAlt,
  faPaperPlane
);

function App() {
  const [userInfo, setUserInfo] = useState();
  const value = { userInfo, setUserInfo };
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const userToken = getUserToken();
    if (userToken) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      };
      fetchMeStuff(`${API_URL}/verify`, options, setUserInfo);
    }
  }, [refresh]);

  return (
    <Router>
      <UserContext.Provider value={value}>
        <Switch>
          <Route path={REGISTER_PAGE}>
            <RegisterPage />
          </Route>
          <Route path={LOGIN_PAGE}>
            <LoginPage />
          </Route>
          <Route path={ADMIN_PAGE}>
            {userInfo ? (
              <AdminPage
                refresh={() => {
                  setRefresh(!refresh);
                }}
              />
            ) : (
              <div className="loaderDiv">
                <Loader />
              </div>
            )}
          </Route>
          <Route exact path={PROFILE_PAGE}>
            <NavBar />
            <ProfilePage
              refresh={() => {
                setRefresh(!refresh);
              }}
            />
          </Route>
          <Route exact path={OFFER_PAGE}>
            <NavBar />
            <OfferPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
