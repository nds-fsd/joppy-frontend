import React, { useEffect, useState } from 'react';
import styles from './joboffer.module.css';
import CompanyIntro from '../CompanyIntro';
import JobPosition from '../JobPosition';
import Description from '../Description';

const JobOffer = ({ offerInfo }) => {
  const [offerData, setOfferData] = useState();

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
    },
  };

  useEffect(() => {
    fetch(`http://localhost:3001/offer/${offerInfo}`, authObject)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        setOfferData(data);
      })
      .catch();
  }, [offerInfo]);

  return (
    <div className={styles.jobOffer}>
      {offerData ? <CompanyIntro companyInfo={offerData.companyInfo} /> : null}
      {offerData ? <JobPosition offerData={offerData} /> : null}
      {offerData ? (
        <Description offerData={offerData} companyInfo={offerData.companyInfo} />
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};
export default JobOffer;
