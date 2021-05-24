import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './adminSideBar.module.css';
import { ADMIN_PAGE, LOGIN_PAGE } from '../../Routers/routers';
import { removeSession } from '../../Utils/Auth';
import { ReactComponent as Logo } from '../../Images/Logo_first_draft.svg';

const AdminSideBar = () => {
  const history = useHistory();

  const handleLogout = () => {
    removeSession();
    history.push(`${LOGIN_PAGE}`);
  };
  return (
    <div className={styles.adminSideBar}>
      <Logo className={styles.logo} />
      <div className={styles.nav}>
        <h3>MY LIBRARY</h3>
        <Link to={`${ADMIN_PAGE}`} className={styles.link}>
          <p>Offers</p>
        </Link>
        <Link to={`${ADMIN_PAGE}/candidates`} className={styles.link}>
          <p>Candidates</p>
        </Link>

        <h3>ACCOUNT</h3>
        <Link to={`${ADMIN_PAGE}/profile`} className={styles.link}>
          <p>Profile</p>
        </Link>
        <div className={styles.link} onClick={handleLogout}>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
