import React from 'react';
import styles from './description.module.css';
// import Tag from '../Tag';

const Description = ({ offerData, companyInfo }) => (
  <div className={styles.jobdescription}>
    <div className={styles.headline}>Full job description</div>
    {offerData ? <p className={styles.infoText}>{offerData.description}</p> : null}
    <hr />
    {companyInfo ? <img src={companyInfo.logo} alt="company logo" width="80" height="80" /> : null}
    {companyInfo ? <div className={styles.headline}>All about {companyInfo.name}</div> : null}
    {companyInfo ? <p>{companyInfo.companySize}</p> : null}
    {companyInfo ? <p className={styles.infoText}>{companyInfo.bio}</p> : null}

    {/* {companyInfo.tech ? <h2>Main tech stack</h2> : null} */}
    {/* {companyInfo.tech
      ? offerData.skills.map((skill) => <Tag key={skill} skill={skill.name} />)
      : null} */}

    <hr />

    <video width="320" height="240" controls>
      <source src="facebook.mp4" type="video/mp4" />
    </video>
  </div>
);

export default Description;
