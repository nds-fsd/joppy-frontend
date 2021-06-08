import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './loginPage.module.css';
import LoginForm from '../../Components/LoginForm';
import { ReactComponent as RightStyle } from '../../Images/rightStyle.svg';
import { getSessionUserRole } from '../../Utils/Auth';

const LoginPage = () => {
  if (getSessionUserRole() && getSessionUserRole() === 'DEVELOPER_ROLE') {
    return <Redirect to="/" />;
  }
  if (getSessionUserRole() && getSessionUserRole() === 'COMPANY_ROLE') {
    return <Redirect to="/admin" />;
  }
  return (
    <div className={styles.loginPage}>
      <LoginForm className={styles.loginForm} />
      <RightStyle className={styles.rightStyle} />
    </div>
  );
};

export default LoginPage;
