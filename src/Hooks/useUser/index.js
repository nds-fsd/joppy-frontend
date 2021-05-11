import { useEffect, useState } from 'react';
import { getFromCache, setToCache } from '../../Utils/cache';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';

const userToken = getUserToken();
const userSession = getSessionUser();
const authObject = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  },
};

const KEY = 'user';

export const useUser = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState(false);

  const successCallback = (payload) => {
    setLoaded(true);
    setUserData(payload);
    setToCache(KEY, payload);
  };

  useEffect(() => {
    const userFromCache = getFromCache(KEY);
    if (userFromCache) {
      setLoaded(true);
      setUserData(userFromCache);
    } else {
      const url = `http://localhost:3001/user/${userSession.id}`;
      fetchMeStuff({
        authObject,
        url,
        body: userData,
        method: 'GET',
        successCallback,
        errorCallback: setError,
      });
    }
  }, []);

  const saveUser = (user) => {
    const url = 'http://localhost:3001/user';

    fetchMeStuff({
      url,
      body: user,
      method: 'POST',
      successCallback,
      errorCallback: setError,
    });
  };

  return {
    userData,
    saveUser,
    error,
    loaded,
  };
};
