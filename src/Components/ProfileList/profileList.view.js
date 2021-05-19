/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styles from './profileList.module.css';
import Tag from '../Tag';

const ProfileList = (array, newArray) => {
  const [newItem, setNewItem] = useState();
  const arr = [array];

  const addItem = () => {
    newArray.push(newItem);
  };
  return (
    <div className={styles.profileList}>
      <input type="text" onChange={(value) => setNewItem(value)} />
      <input type="button" onClick={addItem} value="Add" />
      {array ? arr.map((item) => <Tag name={item} />) : null}
    </div>
  );
};

export default ProfileList;
