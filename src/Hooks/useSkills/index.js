import { useEffect, useState } from 'react';
import { getFromCache, setToCache } from '../../Utils/cache';
import { getUserToken } from '../../Utils/Auth';
import { API_URL } from '../../Routers/routers';

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

  const successCallback = (payload) => {
    setSkillsData(payload);
    setToCache(KEY, payload);
  };

  useEffect(() => {
    const skillsFromCache = getFromCache(KEY);
    if (skillsFromCache) {
      setSkillsData(skillsFromCache);
    } else {
      const url = `${API_URL}/skill/`;
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
    skillsData,
  };
};

export default useSkills;
