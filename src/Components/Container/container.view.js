import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './container.module.css';
import {
  OFFER_PAGE,
  PROFILE_PAGE,
  CHALLENGES_PAGE,
  CONVERSATIONS_PAGE,
} from '../../Routers/routers';
import ButtonsBar from '../ButtonsBar';
import OfferPage from '../../Pages/OfferPage/offerPage.view';

const Container = () => (
  <Router>
    <div className={styles.container}>
      <div className={styles.main}>
        <Switch>
          <Route exact path={OFFER_PAGE} />
          <Route path={PROFILE_PAGE}>
            <OfferPage />
          </Route>
          <Route path={CHALLENGES_PAGE} />
          <Route path={CONVERSATIONS_PAGE} />
        </Switch>
      </div>
      <ButtonsBar />
    </div>
  </Router>
);

export default Container;
