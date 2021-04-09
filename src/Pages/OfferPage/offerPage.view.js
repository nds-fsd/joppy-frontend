import React, { useEffect, useState } from 'react';
import ButtonsBar from '../../Components/ButtonsBar';
import styles from './offerPage.module.css';
import JobOffer from '../../Components/JobOffer';

const OfferPage = () => {
  const [offerArray, setOfferArray] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/offer')
      .then((res) => res.json())
      .then((data) => setOfferArray(data))
      .catch();
  }, []);
  const handleReject = () => setCount(count + 1);
  const handleAccept = () => setCount(count + 1);

  return (
    <div className={styles.offerPageContainer}>
      <div className={styles.offerBody}>
        {offerArray && count < offerArray.length ? (
          <JobOffer offerInfo={offerArray[count]._id} /> //eslint-disable-line
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
      <ButtonsBar rejectClicked={handleReject} acceptClicked={handleAccept} />
    </div>
  );
};

export default OfferPage;
