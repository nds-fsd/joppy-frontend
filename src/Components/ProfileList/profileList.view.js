/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styles from './profileList.module.css';

const ProfileList = ({ array, newArray }) => {
  const [newItem, setNewItem] = useState('');
  const arr = array;

  const addItem = () => {
    if (newItem.length >= 3) {
      arr.push(`${newItem}`);
    }
    setNewItem('');
    newArray(arr);
  };

  const deleteItem = (e) => {
    console.log(e.target.value);
    arr.filter((i) => i !== e.target.value);
    newArray(arr);
  };

  return (
    <div className={styles.profileList}>
      <input
        type="text"
        className={styles.inputText}
        onChange={(e) => setNewItem(e.target.value)}
        value={`${newItem}`}
      />
      <input className={styles.add} type="button" onClick={addItem} value="Add" />
      {arr
        ? arr.map((item) => (
            <div className={styles.itemDiv}>
              <div>{item}</div>
              <button type="button" value={item} className={styles.delete} onClick={deleteItem}>
                x
              </button>
            </div>
          ))
        : null}
    </div>
  );
};

export default ProfileList;
