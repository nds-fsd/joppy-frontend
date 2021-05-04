import React from 'react';
import styles from './navbar.module.css';
import UserMenu from '../UserMenu/userMenu.view';
import { ReactComponent as Logo } from '../../Images/Logo_first_draft.svg';

const NavBar = () => (
  <div className={styles.navbar}>
    <Logo className={styles.logo} />
    <UserMenu />
  </div>
);

export default NavBar;
