import React from 'react';
import ButtonsBar from '../../Components/ButtonsBar';
import styles from './offerPage.module.css';
import JobOffer from '../../Components/JobOffer';

const OfferPage = () => (
  <div className={styles.offerPageContainer}>
    <div className={styles.offerBody}>
      <JobOffer />
    </div>
    <ButtonsBar />
  </div>
);

export default OfferPage;
