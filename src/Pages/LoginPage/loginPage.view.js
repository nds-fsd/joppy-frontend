import React from 'react';
import styles from './loginPage.module.css';
import LoginForm from '../../Components/LoginForm';
import { ReactComponent as RightStyle } from './rightStyle.svg';

const LoginPage = () => (
  <div className={styles.loginPage}>
    <LoginForm className={styles.loginForm} />
    <RightStyle className={styles.rightStyle} />
  </div>
);

export default LoginPage;
