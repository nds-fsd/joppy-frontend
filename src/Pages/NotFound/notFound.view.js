import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HalfLogo } from '../../Images/Spinner.svg';
import styles from './notFound.module.css';

const NotFound = () => (
  <div className={styles.container}>
    <div className={styles.displayDiv}>
      <span className={styles.numberFour}>4</span>
      <div className={styles.halfLogoContainer}>
        <HalfLogo className={styles.halfLogo} />
      </div>
      <span className={styles.numberFour}>4</span>
    </div>
    <p className={styles.message}>
      Whoops&#128517;! <br /> It looks like the page you’re looking for doesn’t exist.
    </p>
    <p className={styles.messageAlt}>
      Click{' '}
      <span>
        <Link to="/">here</Link>
      </span>{' '}
      to go back to the home page.
    </p>
  </div>
);

export default NotFound;
