import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './acceptedOffer.module.css';
import { getUserToken } from '../../Utils/Auth';
import JobPosition from '../JobPosition';
import { API_URL } from '../../Routers/routers';
import Description from '../Description';
import ChatModal from '../ChatModal';

const AcceptedOffer = ({ offer, refresh }) => {
  const [openOffer, setOpenOffer] = useState(false);
  const handleOffer = () => {
    setOpenOffer(!openOffer);
  };
  const [openChat, setOpenChat] = useState(false);
  const handleChat = () => {
    setOpenChat(!openChat);
  };
  console.log(offer);

  const rejectStatus = () => {
    if (getUserToken()) {
      const updateBody = {
        accepted: false,
        rejected: true,
      };
      const updateOptions = {
        method: 'PUT',
        headers: new Headers({
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        }),
        mode: 'cors',
        body: JSON.stringify(updateBody),
      };
      fetch(`${API_URL}/offerstatus/${offer._id}`, updateOptions)
        .then((res) => res.json())
        .catch();
    }
    refresh();
  };

  let offerStyle = `${styles.acceptedOffer}`;
  if (offer.companyAccepted === true) {
    offerStyle = `${offerStyle} ${styles.companyAccepted}`;
  } else if (offer.companyRejected === true) {
    offerStyle = `${offerStyle} ${styles.companyRejected}`;
  }

  return (
    <div className={styles.container}>
      <div className={offerStyle}>
        <div className={styles.info}>
          <div className={styles.logoname}>
            {offer.offerId.companyInfo.photo[0] ? (
              <img
                src={offer.offerId.companyInfo.photo[0]}
                alt="company logo"
                className={styles.logo}
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5E-CamT4OlC0jnxA1uqQXKdYXxDv-gak56Q&usqp=CAU"
                alt="company logo"
                className={styles.logo}
              />
            )}
            <div className={styles.name}>{offer.offerId.companyInfo.name}</div>
          </div>
          <div className={styles.title}>{offer.offerId.title}</div>
          <div className={styles.position}>{offer.offerId.position[0].name}</div>
        </div>
        <div className={styles.options}>
          <div className={styles.seeOffer} onClick={handleOffer}>
            See offer
          </div>
          <div className={styles.iconBlock}>
            {offer.companyAccepted ? (
              <>
                <FontAwesomeIcon icon="comments" className={styles.icon} onClick={handleChat} />
                <FontAwesomeIcon icon="envelope" className={styles.icon} />
              </>
            ) : null}
            <FontAwesomeIcon icon="trash-alt" className={styles.delete} onClick={rejectStatus} />
          </div>
        </div>
      </div>
      {openOffer ? (
        <div className={styles.modal} onClick={handleOffer}>
          <div className={styles.seeOfferModal}>
            <JobPosition offerData={offer.offerId} />
            <Description offerData={offer.offerId} companyInfo={offer.offerId.companyInfo} />
          </div>
        </div>
      ) : null}
      {openChat ? <ChatModal handleClose={handleChat} /> : null}
    </div>
  );
};

export default AcceptedOffer;
