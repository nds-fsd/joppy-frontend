import React, { useState } from 'react';
import Select from 'react-select';
import styles from './adminProfileModal.module.css';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { API_URL } from '../../Routers/routers';

const AdminProfileModal = ({ open, close, userData, locations }) => {
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
    const url = `${API_URL}/user/${getSessionUser().id}`;
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
        })
        .then(close())
        .catch();
    }
  };

  return (
    <div className={styles.adminProfileModal}>
      {userData ? (
        <div className={styles.adminModal}>
          <div className={styles.body}>
            <div className={styles.headline}>Name</div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.body}>
            <div className={styles.headline}>Location</div>
            {locations ? (
              <Select
                className={styles.select}
                placeholder={userData.location.name}
                options={selectOptions}
                value={newLocation.label}
                onChange={(e) => setNewLocation(e.value)}
              />
            ) : null}
          </div>
          <div className={styles.body}>
            <div className={styles.headline}>Bio</div>
            <textarea
              id="bio"
              name="bio"
              rows="6"
              cols="40"
              value={newBio}
              className={styles.inputBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          </div>
          <div className={styles.buttons}>
            <input type="button" className={styles.saveButton} value="Save" onClick={updateUser} />
            <input type="button" className={styles.cancelButton} value="Cancel" onClick={close} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminProfileModal;
