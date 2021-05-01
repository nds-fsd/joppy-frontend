import React from 'react';
import styles from './loginPage.module.css';
import LoginForm from '../../Components/LoginForm';
import { ReactComponent as RightStyle } from '../../Images/rightStyle.svg';
import { ReactComponent as Logo } from '../../Images/Logo_first_draft.svg';

const LoginPage = () => (
  <div className={styles.loginPage}>
    <Logo className={styles.logo} />
    <LoginForm className={styles.loginForm} />
    <RightStyle className={styles.rightStyle} />
  </div>
);

export default LoginPage;
