import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './userMenu.module.css';
import { PROFILE_PAGE, LOGIN_PAGE, OFFER_PAGE } from '../../Routers/routers';
import { removeSession } from '../../Utils/Auth';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const displayMenu = () => {
    setOpen(!open);
  };

  const history = useHistory();

  const logOut = () => {
    removeSession();
    history.push(LOGIN_PAGE);
  };

  return (
    <div className={styles.userMenu}>
      <input type="button" onClick={displayMenu} className={styles.menuButton} value="AN" />

      {open === true ? (
        <div className={styles.menuContent}>
          {{ OFFER_PAGE } && (
            <Link to={PROFILE_PAGE}>
              <FontAwesomeIcon icon="user" />
              Profile
            </Link>
          )}
          {{ PROFILE_PAGE } && (
            <Link to={OFFER_PAGE}>
              <FontAwesomeIcon icon="user" />
              Offers
            </Link>
          )}
          <Link to={LOGIN_PAGE}>
            <div onClick={logOut}>Logout</div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
