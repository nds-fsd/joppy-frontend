import { getStorageObject, setStorageObject, deleteStorageObject } from '../Storage';

export const getUserToken = () => {
  const session = getStorageObject('user-session');
  if (session) return session.token;
  return undefined;
};

export const getSessionUser = () => {
  const session = getStorageObject('user-session');
  if (session) return session.user;
  return undefined;
};

export const getSessionUserRole = () => {
  const session = getStorageObject('user-session');
  if (session) return session.user.role;
  return undefined;
};

export const setUserSession = (sessionData) => {
  setStorageObject('user-session', sessionData);
};

export const removeSession = () => {
  deleteStorageObject('user-session');
  deleteStorageObject('active-chat');
};
