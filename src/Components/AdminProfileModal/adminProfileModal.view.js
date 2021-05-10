import React, { useState } from 'react';
import Select from 'react-select';
import styles from './adminProfileModal.module.css';
import { getUserToken, getSessionUser } from '../../Utils/Auth';

const AdminProfileModal = ({ open, close, userData, locations }) => {
  const [newName, setNewName] = useState();
  const [newBio, setNewBio] = useState();
  const [newLocation, setNewLocation] = useState({});
  if (!open) {
    return null;
  }
  getSessionUser();
  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  };
  const selectOptions = Object.values(locations).map((location) => ({
    value: location._id,
    label: location.name,
  }));

  const updateUser = () => {
    const url = `http://localhost:3001/user/${getSessionUser().id}`;
    const body = {
      name: newName,
      bio: newBio,
      location: newLocation,
    };
    const options = {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(body),
    };
    fetch(url, authObject, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((res) => {
        console.log(res);
      })
      .catch();
  };

  return (
    <div className={styles.adminProfileModal}>
      {userData ? (
        <div className={styles.adminModal}>
          <p>Company name</p>
          <input
            type="text"
            placeholder={userData.name}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.input}
          />
          <p>Location</p>
          {locations ? <Select options={selectOptions} onChange={setNewLocation} /> : null}
          <p>Bio</p>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            cols="40"
            defaultValue={userData.bio}
            className={styles.inputBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <input type="button" className={styles.saveButton} value="Save" onClick={updateUser} />
          <input type="button" className={styles.cancelButton} value="Cancel" onClick={close} />
        </div>
      ) : null}
    </div>
  );
};

export default AdminProfileModal;
