import React, { useEffect, useState } from 'react';
import ButtonsBar from '../../Components/ButtonsBar';
import styles from './offerPage.module.css';
import JobOffer from '../../Components/JobOffer';
import { ReactComponent as Plant } from '../../Images/plant.svg';
import { getSessionUser } from '../../Utils/Auth';

const OfferPage = () => {
  const [offerArray, setOfferArray] = useState();
  const [count, setCount] = useState(0);

  const nextOffer = () => {
    setCount(count + 1);
  };

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

  let url;

  if (offerArray) {
    url = `http://localhost:3001/offer/${offerArray[count]._id}`;
  }

  const userSession = getSessionUser();

  const updateOffer = (body) => {
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
      }),
      mode: 'cors',
      body: JSON.stringify(body),
    };
    fetch(url, options, body)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReject = () => {
    const body = {
      rejected: userSession.id,
    };
    updateOffer(body);
    nextOffer();
  };

  const handleAccept = () => {
    const body = {
      accepted: userSession.id,
    };
    updateOffer(body);

    // fetch(url, options, body)
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     return Promise.reject();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    nextOffer();
  };

  return (
    <div className={styles.offerPage}>
      <div className={styles.offerBody}>
        {offerArray && count < offerArray.length ? (
          <JobOffer offerInfo={offerArray[count]._id} />
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
      <ButtonsBar
        rejectClicked={handleReject}
        acceptClicked={handleAccept}
        nextClicked={nextOffer}
      />
      <Plant className={styles.plant} />
    </div>
  );
};

export default OfferPage;
