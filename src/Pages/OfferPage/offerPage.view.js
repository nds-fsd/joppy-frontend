import React, { useEffect, useState, useContext } from 'react';
import ButtonsBar from '../../Components/ButtonsBar';
import styles from './offerPage.module.css';
import JobOffer from '../../Components/JobOffer';
import { ReactComponent as Plant } from '../../Images/plant.svg';
import { getSessionUser, getUserToken } from '../../Utils/Auth';
import UserContext from '../../Contexts/userContext';
import NoMoreOffers from '../../Components/NoMoreOffers';
import { API_URL } from '../../Routers/routers';

const OfferPage = () => {
  const [offerArray, setOfferArray] = useState();
  const [count, setCount] = useState(0);
  const userToken = getUserToken();
  const userSession = getSessionUser();
  const { userInfo } = useContext(UserContext);
  const [trigger, setTrigger] = useState(false);

  const nextOffer = () => {
    setCount(count + 1);
    setTrigger(!trigger);
  };

  useEffect(() => {
    if (userInfo) {
      const filterOptions = {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        }),
        mode: 'cors',
        body: JSON.stringify({ userId: userInfo._id }),
      };
      fetch(`${API_URL}/offerstatus/filter`, filterOptions)
        .then((res) => res.json())
        .then((data) => setOfferArray(data))
        .catch();
    }
  }, [userInfo]);

  useEffect(() => {}, [trigger]);

  const updateOfferStatus = (body) => {
    const urlOfferStatus = `${API_URL}/offerstatus/`;
    const options = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }),
      mode: 'cors',
      body: JSON.stringify(body),
    };
    fetch(urlOfferStatus, options, body)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        console.log(data);
      })
      .catch();
  };

  const handleReject = () => {
    const body = {
      userId: userSession.id,
      offerId: offerArray[count]._id,
      rejected: true,
    };
    updateOfferStatus(body);
    nextOffer();
  };

  const handleAccept = () => {
    const body = {
      userId: userSession.id,
      offerId: offerArray[count]._id,
      accepted: true,
    };
    updateOfferStatus(body);
    nextOffer();
  };
  const handleSnooze = () => {
    const body = {
      userId: userSession.id,
      offerId: offerArray[count]._id,
      snoozed: true,
    };
    updateOfferStatus(body);
    nextOffer();
  };

  return (
    <div className={styles.offerPage}>
      <div className={styles.offerBody}>
        {offerArray && count < offerArray.length ? (
          <JobOffer offerInfo={offerArray[count]._id} />
        ) : (
          <NoMoreOffers />
        )}
      </div>
      <ButtonsBar
        rejectClicked={handleReject}
        acceptClicked={handleAccept}
        snoozeClicked={handleSnooze}
      />
      <Plant className={styles.plant} />
    </div>
  );
};

export default OfferPage;
