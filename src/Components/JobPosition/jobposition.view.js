import React, { useContext } from 'react';
import styles from './jobposition.module.css';
import Tag from '../Tag';
import UserContext from '../../Contexts/userContext';

const JobPosition = ({ offerData }) => {
  const { userInfo } = useContext(UserContext);
  return (
    <div className={styles.jobPosition}>
      <p className={styles.offerTitle}>{offerData.title}</p>

      {offerData && parseInt(userInfo.salary, 10) <= parseInt(offerData.salary, 10) && (
        <Tag name="Salary" icon="euro-sign" match />
      )}
      {offerData && offerData.companyInfo.location._id === userInfo.location._id && (
        <Tag name={userInfo.location.name} icon="map-marker-alt" match />
      )}

      <p className={styles.headline}>They are searching for</p>
      {offerData &&
        userInfo &&
        offerData.position.map((position) => {
          if (userInfo.positions.some((p) => p.name._id === position._id)) {
            return <Tag name={position.name} match />;
          }
          return <Tag name={position.name} isActive />;
        })}

      <p className={styles.headline}>Skills wanted</p>
      {offerData &&
        offerData.skills.map((skill) => {
          if (userInfo.skills.some((s) => s.name._id === skill._id)) {
            return <Tag name={skill.skill} match />;
          }
          return <Tag name={skill.skill} isActive />;
        })}
    </div>
  );
};

export default JobPosition;
