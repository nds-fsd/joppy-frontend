import { useEffect, useState } from 'react';
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

const useUser = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState({});

  const successCallback = (payload) => {
    setUserData(payload);
  };

  useEffect(() => {
    const url = `http://localhost:3001/user/${userSession.id}`;
    fetchMeStuff({
      authObject,
      url,
      body: userData,
      method: 'GET',
      successCallback,
      errorCallback: setError,
    });
  }, []);

  return {
    userData,
    error,
  };
};

console.log(userData);

export default useUser;
