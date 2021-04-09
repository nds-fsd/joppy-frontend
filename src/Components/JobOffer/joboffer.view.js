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
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        console.log(data);
        setOfferData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [offerInfo]);

  return (
    <div className={styles.scroll}>
      <CompanyIntro />
      <JobPosition offerData={offerData} />
      <Description />
    </div>
  );
};
export default JobOffer;
