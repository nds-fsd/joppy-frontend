import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './acceptedOffer.module.css';
import { getUserToken } from '../../Utils/Auth';
import JobPosition from '../JobPosition';
import { API_URL } from '../../Routers/routers';

const AcceptedOffer = ({ offer, userData, refresh }) => {
  console.log(offer);
  const [openOffer, setOpenOffer] = useState(false);
  const handleOffer = () => {
    setOpenOffer(!openOffer);
  };

  const deleteStatus = () => {
    if (getUserToken()) {
      const options = {
        method: 'DELETE',
        headers: new Headers({
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        }),
        mode: 'cors',
        body: JSON.stringify({ userId: userData._id, offerId: offer._id, accepted: true }),
      };
      console.log({ userId: userData._id, offerId: offer._id, accepted: true });
      fetch(`${API_URL}/offerstatus`, options)
        .then((res) => res.json())
        .catch();
    }
    refresh();
  };

  return (
    <div className={styles.container}>
      <div className={styles.acceptedOffer}>
        <div className={styles.info}>
          <div className={styles.logoname}>
            {offer.companyInfo.photo[0] ? (
              <img src={offer.companyInfo.photo[0]} alt="company logo" className={styles.logo} />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5E-CamT4OlC0jnxA1uqQXKdYXxDv-gak56Q&usqp=CAU"
                alt="company logo"
                className={styles.logo}
              />
            )}
            <div className={styles.name}>{offer.companyInfo.name}</div>
          </div>
          <div className={styles.title}>{offer.title}</div>
          <div className={styles.position}>{offer.position[0].name}</div>
        </div>
        <div className={styles.options}>
          <div className={styles.seeOffer} onClick={handleOffer}>
            See offer
          </div>
          <div className={styles.iconBlock}>
            <FontAwesomeIcon icon="comments" className={styles.icon} />
            <FontAwesomeIcon icon="envelope" className={styles.icon} />
            <FontAwesomeIcon icon="trash-alt" className={styles.delete} onClick={deleteStatus} />
          </div>
        </div>
      </div>
      {openOffer ? (
        <div className={styles.modal}>
          <JobPosition offerData={offer} />
        </div>
      ) : null}
    </div>
  );
};

export default AcceptedOffer;
