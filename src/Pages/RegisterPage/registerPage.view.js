import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../Images/Logo_first_draft.svg';
import styles from './registerPage.module.css';
import ProfileForm from '../../Components/ProfileForm';

const RegisterPage = () => (
  <div className={styles.registerForm}>
    <div className={styles.navBar}>
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </div>
      <Link className={styles.login} to="/login">
        Log In
      </Link>
    </div>
    <ProfileForm />
  </div>
);
export default RegisterPage;
