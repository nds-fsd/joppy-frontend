import { getStorageObject, setStorageObject } from './Storage';

// const TIME_IN_CACHE = 48 * 60 * 60 * 1000;

export const getFromCache = (key) => {
  const objectFromCache = getStorageObject(key);
  if (objectFromCache) {
    return objectFromCache.skills;
  }
  return undefined;
};

export const setToCache = (key, skills) => {
  const objetToCache = {
    skills,
  };
  setStorageObject(key, objetToCache);
};

//  && objectFromCache.expirationDate > new Date().getTime()
