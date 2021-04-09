import React from 'react';
import styles from './joboffer.module.css';
import CompanyIntro from '../CompanyIntro';
import JobPosition from '../JobPosition';
import Description from '../Description';

const JobOffer = ({ placeholder }) => (
  <div className={styles.scroll}>
    <h1>{placeholder}</h1>
    <CompanyIntro />
    <JobPosition />
    <Description />
  </div>
);

export default JobOffer;
