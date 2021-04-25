import React from 'react';
import styles from './tagBlock.module.css';
import Tag from '../Tag';

const TagBlock = ({
  array,
  tagClicked,
  attributeName,
  title,
  subtitle,
  otherArray,
  yearsOnChange,
}) => {
  const nameById = (id, arr, attribute) => {
    const object = arr.find((item) => item._id === id);
    return object[attribute];
  };

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
                isActive={otherArray.some((e) => e.name === item._id)}
              />
            ))
          : null}
        {otherArray.length > 0 && (
          <div className={styles.skillsWithYears}>
            {otherArray.map((obj) => (
              <div>
                <Tag name={nameById(obj.name, array, attributeName)} />
                <input
                  type="range"
                  min="0"
                  max="11"
                  step="1"
                  value={obj.years}
                  onChange={(e) => yearsOnChange(e.target.value, obj.name)}
                />
                <span>{obj.years === '0' && '<1'}</span>
                <span>{obj.years === '11' && '>10'}</span>
                <span>{obj.years !== '0' && obj.years !== '11' && obj.years}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagBlock;
