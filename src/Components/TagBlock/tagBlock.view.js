import React, { useState } from 'react';
import styles from './tagBlock.module.css';
import Tag from '../Tag';

const TagBlock = ({ array, tagClicked, attributeName, title, subtitle, otherArray }) => {
  const nameById = (id, arr, attribute) => {
    const object = arr.find((item) => item._id === id);
    return object[attribute];
  };

  const [years, setYears] = useState('5');

  return (
    <div className={styles.tagBlockContainer}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div>
        {array
          ? array.map((item) => (
              <Tag
                name={item[attributeName]}
                onClick={tagClicked}
                value={item._id}
                isActive={otherArray.includes(item._id)}
              />
            ))
          : null}
        {otherArray.length > 0 && (
          <div className={styles.skillsWithYears}>
            {otherArray.map((id) => (
              <div>
                <Tag name={nameById(id, array, attributeName)} />
                <input
                  type="range"
                  min="0"
                  max="11"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
                <span>{years === '0' && '<1'}</span>
                <span>{years === '11' && '>10'}</span>
                <span>{years !== '0' && years !== '11' && years}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagBlock;
