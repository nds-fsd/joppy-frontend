import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './companyintro.module.css';

const CompanyIntro = ({ companyInfo }) => (
  <div className={styles.container}>
    {companyInfo && (
      <img
        className={styles.companyLogo}
        src={companyInfo.photo[0]}
        alt="company logo"
        width="80"
        height="80"
      />
    )}
    <div className={styles.title}>
      {companyInfo ? <h4 className={styles.companyname}>{companyInfo.name}</h4> : null}
      {companyInfo ? (
        <h5 className={styles.location}>
          <span>
            <FontAwesomeIcon icon="map-marker-alt" />
          </span>{' '}
          {companyInfo.location.name}
        </h5>
      ) : null}
    </div>
  </div>
);

export default CompanyIntro;
