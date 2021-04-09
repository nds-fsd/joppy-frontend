import React from 'react';
import styles from './joboffer.module.css';
import CompanyIntro from '../CompanyIntro';
import JobPosition from '../JobPosition';
import Description from '../Description';

const JobOffer = () => (
  <div className={styles.scroll}>
    <CompanyIntro />
    <JobPosition />
    <Description />
  </div>
);

export default JobOffer;
