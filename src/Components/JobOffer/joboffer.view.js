import React, { useEffect, useState } from 'react';
import styles from './joboffer.module.css';
import CompanyIntro from '../CompanyIntro';
import JobPosition from '../JobPosition';
import Description from '../Description';
import Loader from '../Loader';
import { API_URL } from '../../Routers/routers';
import { getUserToken } from '../../Utils/Auth';

const JobOffer = ({ offerInfo }) => {
  const [offerData, setOfferData] = useState();

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  };

  useEffect(() => {
    fetch(`${API_URL}/offer/${offerInfo}`, authObject)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        console.log(data);
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
        <div className={styles.Loader}>
          <Loader />
        </div>
      )}
    </div>
  );
};
export default JobOffer;
