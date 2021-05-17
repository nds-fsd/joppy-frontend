import React from 'react';
import styles from './description.module.css';
// import Tag from '../Tag';

const Description = ({ offerData, companyInfo }) => (
  <div className={styles.jobdescription}>
    <div className={styles.contentBox}>
      <div className={styles.headline}>Full job description</div>
      {offerData && <p className={styles.infoText}>{offerData.description}</p>}
    </div>

    <div className={styles.logoAndTitle}>
      <div className={styles.logoLineBundle}>
        <div className={styles.logo}>
          {companyInfo && (
            <img src={companyInfo.photo[0]} alt="company logo" width="80" height="80" />
          )}
        </div>
        <hr className={styles.line} />
      </div>
      {companyInfo && <div className={styles.headline}>All about {companyInfo.name}</div>}
    </div>
    <div className={styles.contentBox}>
      {companyInfo && <p className={styles.infoText}>{companyInfo.bio}</p>}
    </div>

    {/* {companyInfo.tech ? <h2>Main tech stack</h2> : null} */}
    {/* {companyInfo.tech
      ? offerData.skills.map((skill) => <Tag key={skill} skill={skill.name} />)
      : null} */}
  </div>
);

export default Description;
