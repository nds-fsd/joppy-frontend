import React from 'react';
import { ReactComponent as HalfLogo } from '../../Images/Spinner.svg';
import styles from './noMoreOffers.module.css';

const NoMoreOffers = () => (
  <div className={styles.container}>
    <div className={styles.halfLogoContainer}>
      <HalfLogo className={styles.halfLogo} />
    </div>
    <p className={styles.pageText}>
      We‘re out of job opportunities to show you <br /> at this time.
    </p>
    <p className={styles.pageText}>
      Come back later too see if any new <br /> ones have been added
    </p>
  </div>
);

export default NoMoreOffers;
