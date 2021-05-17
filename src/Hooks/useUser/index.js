/*eslint-disable*/

import { useEffect, useState } from 'react';
import { getFromCache, setToCache } from '../../Utils/cache';
import { getUserToken, getSessionUser } from '../../Utils/Auth';

const userToken = getUserToken();
const userSession = getSessionUser();
const authObject = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  },
};

const KEY = 'user-session';

const useUser = () => {
  const [userData, setUserData] = useState();

  const successCallback = (payload) => {
    setUserData(payload);
    setToCache(KEY, payload);
  };

  useEffect(() => {
    const userFromCache = getFromCache(KEY);
    if (userFromCache) {
      setUserData(userFromCache);
    } else {
      const url = `http://localhost:3001/user/${userSession.id}`;
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
    userData,
  };
};

export default useUser;
