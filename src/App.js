import './App.css';
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
} from '@fortawesome/free-solid-svg-icons';

import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';

import { OFFER_PAGE, PROFILE_PAGE, CHALLENGES_PAGE, CONVERSATIONS_PAGE } from './Routers/routers';
import OfferPage from './Pages/OfferPage/offerPage.view';

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
  faCommentAlt
);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={OFFER_PAGE}>
            <OfferPage />
          </Route>
          <Route exact path={PROFILE_PAGE}>
            <h1>Profile</h1>
          </Route>
          <Route exact path={CHALLENGES_PAGE}>
            <h1>Challenges</h1>
          </Route>
          <Route exact path={CONVERSATIONS_PAGE}>
            <h1>Conversations</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
