import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './userMenu.module.css';
import { PROFILE_PAGE, LOGIN_PAGE, OFFER_PAGE } from '../../Routers/routers';
import { removeSession } from '../../Utils/Auth';
import UserContext from '../../Contexts/userContext';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const displayMenu = () => {
    setOpen(!open);
  };

  let uName = '';
  if (userInfo) {
    uName = userInfo.name;
  }

  const history = useHistory();

  const logOut = async () => {
    await setUserInfo(null);
    removeSession();
    history.push(LOGIN_PAGE);
  };

  return (
    <div className={styles.userMenu}>
      {userInfo ? (
        <>
          <input
            type="button"
            onClick={displayMenu}
            onPointerOver={displayMenu}
            className={styles.menuButton}
            value={uName.charAt(0)}
          />

          {open === true ? (
            <>
              <div className={styles.menuContent}>
                <span className={styles.tip} />
                <Link to={PROFILE_PAGE} className={styles.Link}>
                  Profile
                </Link>
                <Link to={OFFER_PAGE} className={styles.Link}>
                  Offers
                </Link>
                <Link to={LOGIN_PAGE} className={styles.Link}>
                  <div onClick={logOut}>Logout</div>
                </Link>
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default UserMenu;
