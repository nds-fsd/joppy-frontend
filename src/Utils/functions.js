const fetchMeStuff = (url, auth, func) => {
  fetch(url, auth)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject();
    })
    .then((data) => {
      func(data);
    })
    .catch();
};

export default fetchMeStuff;
