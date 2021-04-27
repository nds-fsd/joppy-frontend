import React from 'react';
import styles from './registerPage.module.css';
import ProfileForm from '../../Components/ProfileForm';

const RegisterPage = () => (
  <div className={styles.registerForm}>
    <div className={styles.navBar}>
      <p>Logo Here</p>
      <p>Log In</p>
    </div>
    <ProfileForm />
  </div>
);

export default RegisterPage;
