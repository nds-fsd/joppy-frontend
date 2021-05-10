import React, { useEffect, useState } from 'react';
import styles from './adminProfLanguages.module.css';
import Tag from '../Tag';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';

const AdminProfLanguages = ({ userLanguages, close }) => {
  const [languages, setLanguages] = useState([]);
  const [updatedLanguages, setUpdatedLanguages] = useState({ languages: [] });
  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  };
  useEffect(() => {
    fetchMeStuff('http://localhost:3001/language', authObject, setLanguages);
  }, []);
  // const addLanguage = (languageId) => {
  //   if (userLanguages.some((e) => e._id === languageId)) {
  //     setUpdatedLanguages({ ...userLanguages, ...userLanguages.filter((s) => s !== languageId) });
  //   } else {
  //     setUpdatedLanguages({ languages: [...userLanguages, languageId] });
  //   }
  // };

  const addLanguage = (languageId) => {
    const array = [...userLanguages, { ...languageId }];
    array.push(languageId);
    console.log(array);
  };

  console.log(updatedLanguages);
  const options = {
    method: 'PUT',
    headers: new Headers({ Accept: 'application/json', 'Content-type': 'application/json' }),
    mode: 'cors',
    body: JSON.stringify(updatedLanguages),
  };
  const url = `http://localhost:3001/user/${getSessionUser().id}`;

  const saveLanguages = () => {
    if (getUserToken()) {
      fetch(url, authObject, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject();
        })
        .then((res) => {
          setUpdatedLanguages(res);
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
              value={language._id}
              onClick={addLanguage}
              isActive={userLanguages.some((e) => e._id === language._id)}
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
