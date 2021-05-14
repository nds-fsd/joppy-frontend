import React, { useState } from 'react';
import Select from 'react-select';
import styles from './adminProfileModal.module.css';
import { getUserToken, getSessionUser } from '../../Utils/Auth';

const AdminProfileModal = ({ open, close, userData, locations }) => {
  console.log(userData);
  const [newName, setNewName] = useState(userData.name);
  const [newBio, setNewBio] = useState(userData.bio);
  const [newLocation, setNewLocation] = useState(userData.location);
  if (!open) {
    return null;
  }
  getUserToken();

  const selectOptions = Object.values(locations).map((location) => ({
    value: location._id,
    label: location.name,
  }));

  const updateUser = () => {
    const url = `http://localhost:3001/user/${getSessionUser().id}`;
    const bodyInfo = {
      name: newName,
      bio: newBio,
      location: newLocation,
    };
    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: JSON.stringify(bodyInfo),
    };
    if (getUserToken()) {
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject();
        })
        .then((res) => {
          console.log(res);
          console.log(bodyInfo);
        })
        .then(close())
        .catch();
    }
  };

  return (
    <div className={styles.adminProfileModal}>
      {userData ? (
        <div className={styles.adminModal}>
          <p>Name</p>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.input}
          />
          <p>Location</p>
          {locations ? (
            <Select
              placeholder={userData.location.name}
              options={selectOptions}
              value={newLocation.label}
              onChange={(e) => setNewLocation(e.value)}
            />
          ) : null}
          <p>Bio</p>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            cols="40"
            value={newBio}
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
