import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './userMenu.module.css';
import { PROFILE_PAGE, LOGIN_PAGE } from '../../Routers/routers';
import { removeSession } from '../../Utils/Auth';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const displayMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.userMenu}>
      <input type="button" onClick={displayMenu} className={styles.menuButton} value="AN" />

      {open === true ? (
        <div className={styles.menuContent}>
          <Link to={PROFILE_PAGE}>
            <FontAwesomeIcon icon="user" />
            Profile
          </Link>
          <Link to={LOGIN_PAGE}>
            <div onClick={removeSession}>Logout</div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
