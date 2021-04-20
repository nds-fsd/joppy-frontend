import React, { useEffect, useState } from 'react';
import ButtonsBar from '../../Components/ButtonsBar';
import styles from './offerPage.module.css';
import JobOffer from '../../Components/JobOffer';

const OfferPage = () => {
  const [offerArray, setOfferArray] = useState();
  const [count, setCount] = useState(0);

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
    },
  };

  useEffect(() => {
    fetch('http://localhost:3001/offer', authObject)
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
