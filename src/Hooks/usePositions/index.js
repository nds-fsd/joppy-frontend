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

const KEY = 'positions';

const usePositions = () => {
  const [positionsData, setPositionsData] = useState();

  const getFromCache = (key) => {
    const objectFromCache = getStorageObject(key);
    if (objectFromCache) {
      return objectFromCache.positions;
    }
    return undefined;
  };

  const setToCache = (key, positions) => {
    const objetToCache = {
      positions,
    };
    setStorageObject(key, objetToCache);
  };

  const successCallback = (payload) => {
    setPositionsData(payload);
    setToCache(KEY, payload);
  };

  useEffect(() => {
    const positionsFromCache = getFromCache(KEY);
    if (positionsFromCache) {
      setPositionsData(positionsFromCache);
    } else {
      const url = `${API_URL}/position/`;
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
    positionsData,
  };
};

export default usePositions;
