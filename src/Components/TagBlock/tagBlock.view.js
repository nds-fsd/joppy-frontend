import React from 'react';
import styles from './tagBlock.module.css';
import Tag from '../Tag';

const TagBlock = ({ array, tagClicked, attributeName, title, subtitle, otherArray }) => {
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
                isActive={otherArray.includes(item._id)}
              />
            ))
          : null}
        {otherArray.length > 0 && (
          <div className={styles.skillsWithYears}>
            {otherArray.map((id) => (
              <div>
                <Tag name={nameById(id, array, attributeName)} />
                <input type="range" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagBlock;
