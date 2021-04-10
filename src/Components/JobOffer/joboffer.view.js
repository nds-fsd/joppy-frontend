import React, { useEffect, useState } from 'react';
import styles from './joboffer.module.css';
import CompanyIntro from '../CompanyIntro';
import JobPosition from '../JobPosition';
import Description from '../Description';

const JobOffer = ({ offerInfo }) => {
  const [offerData, setOfferData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/offer/${offerInfo}`)
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
    <div className={styles.scroll}>
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
