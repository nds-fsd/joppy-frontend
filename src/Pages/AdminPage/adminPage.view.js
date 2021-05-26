import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './adminPage.module.css';
import AdminSideBar from '../../Components/AdminSideBar';
import { ADMIN_PAGE } from '../../Routers/routers';
import AdminTable from '../../Components/AdminTable';
import AdminCandidates from '../../Components/AdminCandidates';
import AdminProfile from '../../Components/AdminProfile';

const AdminPage = () => (
  <div className={styles.adminPage}>
    <AdminSideBar className={styles.adminSideBar} />
    <div className={styles.adminMain}>
      <Switch>
        <Route exact path={`${ADMIN_PAGE}/candidates`}>
          <div className={styles.link}>Candidates</div>
          <AdminCandidates className={styles.container} />
        </Route>
        <Route exact path={`${ADMIN_PAGE}/profile`}>
          <div className={styles.link}>Profile</div>
          <AdminProfile className={styles.container} />
        </Route>
        <Route path={`${ADMIN_PAGE}`}>
          <div className={styles.link}>Offers</div>
          <AdminTable endpoint="offer" />
        </Route>
      </Switch>
    </div>
  </div>
);

export default AdminPage;
