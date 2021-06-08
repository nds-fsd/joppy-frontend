import React, { useState } from 'react';
import ButtonsBar from '../ButtonsBar';
import styles from './snoozedOffers.module.css';
import JobOffer from '../JobOffer';
import NavBar from '../NavBar';
import { getUserToken } from '../../Utils/Auth';
import NoMoreOffers from '../NoMoreOffers';
import { API_URL } from '../../Routers/routers';

const SnoozedOffers = ({ snoozedOfferArray }) => {
  const [count, setCount] = useState(0);
  const userToken = getUserToken();
  const [trigger, setTrigger] = useState(false);

  const nextOffer = () => {
    setCount(count + 1);
    setTrigger(!trigger);
  };

  const updateOfferStatus = (body) => {
    const urlOfferStatus = `${API_URL}/offerstatus/${snoozedOfferArray[count]._id}`;
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }),
      mode: 'cors',
      body: JSON.stringify(body),
    };
    if (userToken) {
      fetch(urlOfferStatus, options, body)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject();
        })
        .catch();
    }
  };
  const handleReject = () => {
    const body = {
      rejected: true,
      snoozed: false,
    };
    updateOfferStatus(body);
    nextOffer();
  };

  const handleAccept = () => {
    const body = {
      accepted: true,
      snoozed: false,
    };
    updateOfferStatus(body);
    nextOffer();
  };
  const handleSnooze = () => {
    nextOffer();
  };
  return (
    <div className={styles.snoozedPage}>
      <NavBar />
      {snoozedOfferArray !== undefined && snoozedOfferArray.length >= 1 ? (
        <>
          <div className={styles.offerBody}>
            <JobOffer offerInfo={snoozedOfferArray[count].offerId._id} />
          </div>
          <ButtonsBar
            className={styles.buttonsBar}
            rejectClicked={handleReject}
            acceptClicked={handleAccept}
            snoozeClicked={handleSnooze}
          />
        </>
      ) : (
        <div className={styles.offerBody}>
          <NoMoreOffers />
        </div>
      )}
    </div>
  );
};

export default SnoozedOffers;
