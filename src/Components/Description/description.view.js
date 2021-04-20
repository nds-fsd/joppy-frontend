import React from 'react';
import styles from './description.module.css';
// import Tag from '../Tag';

const Description = ({ offerData, companyInfo }) => (
  <div className={styles.jobdescription}>
    <h2>Job Description</h2>
    {offerData ? <p>{offerData.description}</p> : null}
    <hr />
    {companyInfo ? <img src={companyInfo.logo} alt="company logo" width="80" height="80" /> : null}
    {companyInfo ? <h2>All about {companyInfo.name}</h2> : null}
    {companyInfo ? <p>{companyInfo.type}</p> : null}
    {companyInfo ? <p>{companyInfo.description}</p> : null}

    {/* {companyInfo.skills ? <h2>Main tech stack</h2> : null} */}
    {/* {companyInfo.skills
      ? offerData.skills.map((skill) => <Tag key={skill} skill={skill.skill} />)
      : null} */}

    <hr />

    <video width="320" height="240" controls>
      <source src="facebook.mp4" type="video/mp4" />
    </video>
  </div>
);

export default Description;
