import React, { useState } from 'react';
import Select from 'react-select';
import styles from './adminProfileModal.module.css';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { API_URL } from '../../Routers/routers';

const AdminProfileModal = ({ open, close, userData, locations }) => {
  const [newImage, setNewImage] = useState(userData.photo);
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
    const bodyInfo = {
      name: newName,
      bio: newBio,
      location: newLocation,
    };
    // const imageData = new FormData();
    // Object.values(newImage).forEach((image, index) => {
    //   imageData.append(index, image);
    // });

    const imageOptions = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      mode: 'cors',
      body: newImage,
    };
    console.log(newImage);
    if (getUserToken()) {
      fetch(`${API_URL}/image`, imageOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject();
        })
        .then((images) => {
          const imageIds = images.map((img) => img.id);
          const finalData = { ...bodyInfo, images: imageIds };
          fetch(`${API_URL}/user/${getSessionUser().id}`, {
            method: 'PUT',
            headers: new Headers({
              Accept: 'application/json',
              'Content-type': 'application/json',
              Authorization: `Bearer ${getUserToken()}`,
            }),
            mode: 'cors',
            body: JSON.stringify(finalData),
          });
        })
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
    console.log(newImage);
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
          <input
            type="file"
            onChange={(e) => {
              setNewImage(e.target.value);
            }}
          />
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
