import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './adminPage.module.css';
import AdminSideBar from '../../Components/AdminSideBar';
import { ADMIN_PAGE } from '../../Routers/routers';

const AdminPage = () => (
  <div className={styles.adminPage}>
    <Router>
      <AdminSideBar className={styles.adminSideBar} />
      <div className={styles.adminMain}>
        <Switch>
          <Route path={`${ADMIN_PAGE}/offers`}>
            <h1>Offers</h1>
            <div className={styles.container}>Container</div>
          </Route>
          <Route path={`${ADMIN_PAGE}/candidates`}>
            <h1>Candidates</h1>
            <div className={styles.container}>Container</div>
          </Route>
          <Route path={`${ADMIN_PAGE}/profile`}>
            <h1>Profile</h1>
            <div className={styles.container}>Container</div>
          </Route>
          <Route path={`${ADMIN_PAGE}/logout`}>
            <h1>Logout</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
);
export default AdminPage;
