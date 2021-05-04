import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './adminPage.module.css';
import AdminSideBar from '../../Components/AdminSideBar';
import { ADMIN_PAGE } from '../../Routers/routers';
import AdminTable from '../../Components/AdminTable';
import AdminCandidates from '../../Components/AdminCandidates';

const AdminPage = () => (
  <div className={styles.adminPage}>
    <Router>
      <AdminSideBar className={styles.adminSideBar} />
      <div className={styles.adminMain}>
        <Switch>
          <Route path={`${ADMIN_PAGE}/offers`}>
            <h1>Offers</h1>
            <AdminTable endpoint="offer" />
          </Route>
          <Route path={`${ADMIN_PAGE}/candidates`}>
            <div className={styles.link}>Candidates</div>
            <AdminCandidates className={styles.container} />
          </Route>
          <Route path={`${ADMIN_PAGE}/profile`}>
            <div className={styles.link}>Profile</div>
            <div className={styles.container}>Container</div>
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
);

export default AdminPage;
