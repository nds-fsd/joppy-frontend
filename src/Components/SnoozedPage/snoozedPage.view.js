import React, { useState } from 'react';
import { ReactComponent as HalfLogo } from '../../Images/Spinner.svg';
import SnoozedOffers from '../SnoozedOffers/snoozedOffers.view';
import styles from './snoozedPage.module.css';

const SnoozedPage = ({ snoozedOfferArray }) => {
  const [openSnoozed, setOpenSnoozed] = useState(false);
  const handleSnoozedPage = () => {
    setOpenSnoozed(true);
  };
  return (
    <div className={styles.snoozedPage}>
      <div className={styles.container}>
        <div className={styles.halfLogoContainer}>
          <HalfLogo className={styles.halfLogo} />
        </div>
        <p className={styles.pageText}>
          There‘s no new offers to show you <br /> at this time.
        </p>
        <p className={styles.pageText}>You can see again your snoozed offers</p>
        <div className={styles.here} onClick={handleSnoozedPage}>
          here.
        </div>
        {openSnoozed ? <SnoozedOffers snoozedOfferArray={snoozedOfferArray} /> : null}
      </div>
    </div>
  );
};

export default SnoozedPage;
