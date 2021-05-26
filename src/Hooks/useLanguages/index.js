import { useEffect, useState } from 'react';
import { API_URL } from '../../Routers/routers';
import { getUserToken } from '../../Utils/Auth';
import { getStorageObject, setStorageObject } from '../../Utils/Storage';

const userToken = getUserToken();
const authObject = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  },
};

const KEY = 'languages';

const useLanguages = () => {
  const [languagesData, setLanguagesData] = useState();

  const getFromCache = (key) => {
    const objectFromCache = getStorageObject(key);
    if (objectFromCache) {
      return objectFromCache.key;
    }
    return undefined;
  };

  const setToCache = (key, languages) => {
    const objectToCache = { languages };
    setStorageObject(key, objectToCache);
  };
  const successCallback = (payload) => {
    setLanguagesData(payload);
    setToCache(KEY, payload);
  };

  useEffect(() => {
    const languagesFromCache = getFromCache(KEY);
    if (languagesFromCache) {
      setLanguagesData(languagesFromCache);
    } else {
      const url = `${API_URL}/language/`;
      if (userToken) {
        fetch(url, authObject)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject();
          })
          .then((payload) => {
            successCallback(payload);
          })
          .catch();
      }
    }
  }, []);

  return {
    languagesData,
  };
};

export default useLanguages;
