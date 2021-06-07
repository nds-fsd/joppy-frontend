import React, { useState } from 'react';
import Select from 'react-select';
import styles from './adminProfileModal.module.css';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { API_URL } from '../../Routers/routers';

const AdminProfileModal = ({ open, close, userData, locations, refresh }) => {
  const [newName, setNewName] = useState(userData.name);
  const [newBio, setNewBio] = useState(userData.bio);
  const [newLocation, setNewLocation] = useState(userData.location);
  const [previewSource, setPreviewSource] = useState();
  const [updatedImage, setUpdatedImage] = useState(userData.photo[0]);

  if (!open) {
    return null;
  }

  const selectOptions = Object.values(locations).map((location) => ({
    value: location._id,
    label: location.name,
  }));

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const uploadImage = () => {
    fetch(`${API_URL}/image/upload`, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      }),
      body: JSON.stringify({ data: previewSource }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((res) => {
        console.log(res);
        setUpdatedImage(res.url);
        refresh();
        console.log(updatedImage);
      })
      .catch();
  };

  const updateUser = () => {
    const bodyInfo = {
      name: newName,
      bio: newBio,
      location: newLocation,
      photo: updatedImage,
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
      fetch(`${API_URL}/user/${getSessionUser().id}`, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject();
        })
        .then(refresh())
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
            <div className={styles.headline}>Profile picture</div>
            <input type="file" onChange={handleFileInputChange} />
            <input type="button" className={styles.saveButton} value="Save" onClick={uploadImage} />

            <br />
            {previewSource && <img src={previewSource} className={styles.preview} alt="chosen" />}
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
