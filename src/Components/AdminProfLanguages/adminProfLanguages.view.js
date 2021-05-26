import React, { useEffect, useState } from 'react';
import styles from './adminProfLanguages.module.css';
import Tag from '../Tag';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';
import { API_URL } from '../../Routers/routers';

const AdminProfLanguages = ({ userLanguages, close }) => {
  const [languages, setLanguages] = useState([]);
  const [updatedLanguages, setUpdatedLanguages] = useState(userLanguages);
  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  };
  useEffect(() => {
    fetchMeStuff(`${API_URL}/language`, authObject, setLanguages);
  }, []);

  const addLanguage = (languageId) => {
    if (updatedLanguages.some((language) => language._id === languageId._id)) {
      setUpdatedLanguages([
        ...updatedLanguages.filter((language) => language._id !== languageId._id),
      ]);
    } else {
      setUpdatedLanguages([...updatedLanguages, languageId]);
    }
  };
  const options = {
    method: 'PUT',
    headers: new Headers({
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    }),
    mode: 'cors',
    body: JSON.stringify({ languages: updatedLanguages }),
  };
  const url = `${API_URL}/user/${getSessionUser().id}`;

  const saveLanguages = () => {
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
    <div className={styles.adminProfLanguages}>
      <p>Select language</p>
      {languages
        ? languages.map((language) => (
            <Tag
              name={language.name}
              value={language}
              onClick={addLanguage}
              isActive={updatedLanguages.some((e) => e._id === language._id)}
            />
          ))
        : null}
      <div className={styles.buttons}>
        <input type="button" value="Save" onClick={saveLanguages} className={styles.saveButton} />
        <input type="button" className={styles.cancelButton} value="Cancel" onClick={close} />
      </div>
    </div>
  );
};
export default AdminProfLanguages;
