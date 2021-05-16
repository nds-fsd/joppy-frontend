import { useEffect, useState } from 'react';
import { getFromCache, setToCache } from '../../Utils/cache';
import { getUserToken } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';

const userToken = getUserToken();
const authObject = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  },
};

const KEY = 'skills';

const useSkills = () => {
  const [skillsData, setSkillsData] = useState();
  const [error, setError] = useState({});

  const successCallback = (payload) => {
    setSkillsData(payload);
    setToCache(KEY, payload);
  };

  useEffect(() => {
    const skillsFromCache = getFromCache(KEY);
    if (skillsFromCache) {
      setSkillsData(skillsFromCache);
    } else {
      const url = `http://localhost:3001/skills/`;
      fetchMeStuff({
        authObject,
        url,
        body: skillsData,
        method: 'GET',
        successCallback,
        errorCallback: setError,
      });
    }
  }, []);

  return {
    SkillsData,
    error,
  };
};

export default useSkills;
