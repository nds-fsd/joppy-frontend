import React from 'react';
import ButtonsBar from '../../Components/ButtonsBar';
import NavBar from '../../Components/NavBar';
import styles from './offerPage.module.css';

const OfferPage = () => (
  <div className={styles.offerPageContainer}>
    <NavBar />
    <div className={styles.offerBody}>Something</div>
    <ButtonsBar />
  </div>
);

export default OfferPage;
