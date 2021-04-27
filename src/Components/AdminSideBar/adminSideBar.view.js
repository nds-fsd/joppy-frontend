import React from 'react';
import { Link } from 'react-router-dom';
import styles from './adminSideBar.module.css';
import { ADMIN_PAGE } from '../../Routers/routers';
import { ReactComponent as Logo } from '../../Images/Logo_first_draft.svg';

const AdminSideBar = () => (
  <div className={styles.adminSideBar}>
    <Logo className={styles.logo} />
    <div className={styles.nav}>
      <h3>MY LIBRARY</h3>
      <Link to={`${ADMIN_PAGE}/offers`} className={styles.link}>
        <p>Offers</p>
      </Link>
      <Link to={`${ADMIN_PAGE}/candidates`} className={styles.link}>
        <p>Candidates</p>
      </Link>

      <h3>ACCOUNT</h3>
      <Link to={`${ADMIN_PAGE}/profile`} className={styles.link}>
        <p>Profile</p>
      </Link>
      <Link to={`${ADMIN_PAGE}/logout`} className={styles.link}>
        <p>Logout</p>
      </Link>
    </div>
  </div>
);

export default AdminSideBar;
