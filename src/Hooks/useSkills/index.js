import { useEffect, useState } from 'react';
import { getFromCache, setToCache } from '../../Utils/cache';
import { getUserToken } from '../../Utils/Auth';
import { fetchMeStuff } from '../utils/functions.js';

const userToken = getUserToken();
const authObject = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  },
};

const KEY = 'skills';

export const useSkills = () => {
  const [skills, setSkills] = useState();
  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState(false);

  const successCallback = (payload) => {
    setLoaded(true);
    setSkills(payload);
    setToCache(KEY, payload);
  };

  useEffect(() => {
    const skillsFromCache = getFromCache(KEY);
    if (skillsFromCache) {
      setLoaded(true);
      setSkills(skillsFromCache);
    } else {
      const url = 'http://localhost:3001/skills';
      fetchMeStuff({
        authObject,
        url,
        body: skills,
        method: 'GET',
        successCallback,
        errorCallback: setError,
      });
    }
  }, []);

  const saveSkill = (skill) => {
    const url = 'http://localhost:3001/skills';

    fetchMeStuff({
      url,
      body: skills,
      method: 'POST',
      successCallback,
      errorCallback: setError,
    });
  };

  const search = (skills) => {
    return skills.filter((skill) => skill.name.startsWith(skills));
  };

  return {
    skills,
    saveSkill,
    error,
    loaded,
    search,
  };
};
