import { getStorageObject, setStorageObject } from './Storage';

const TIME_IN_CACHE = 48 * 60 * 60 * 1000;

export const getFromCache = (key) => {
  const objectFromCache = getStorageObject(key);
  if (objectFromCache && objectFromCache.expirationDate > new Date().getTime()) {
    return objectFromCache.data;
  }
  return undefined;
};

export const setToCache = (key, data, timeInCache = TIME_IN_CACHE) => {
  const objetToCache = {
    data,
    expirationDate: new Date().getTime() + timeInCache,
  };
  setStorageObject(key, objetToCache);
};
