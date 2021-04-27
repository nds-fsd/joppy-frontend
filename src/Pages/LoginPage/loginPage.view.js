import React from 'react';
import styles from './loginPage.module.css';
import LoginForm from '../../Components/LoginForm';

const LoginPage = () => (
  <div className={styles.loginPage}>
    <LoginForm />
  </div>
);

export default LoginPage;
