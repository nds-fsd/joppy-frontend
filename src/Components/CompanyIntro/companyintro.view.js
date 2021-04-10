import React from 'react';
import styles from './companyintro.module.css';

const CompanyIntro = ({ companyInfo }) => (
  <div className={styles.container}>
    <div>
      {companyInfo ? (
        <img src={companyInfo.logo} alt="company logo" width="80" height="80" />
      ) : null}
    </div>
    <div className={styles.title}>
      {companyInfo ? <h4 className={styles.companyname}>{companyInfo.name}</h4> : null}
      {companyInfo ? <p className={styles.size}>{companyInfo.type}</p> : null}
      {companyInfo ? <p className={styles.profile}>Full Company profile</p> : null}
    </div>
  </div>
);

export default CompanyIntro;
