export const postFetch = async (
  urlExtension,
  body,
  url = 'https://lit-beyond-77487.herokuapp.com'
) => {
  return fetch(url + urlExtension, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

export const getFetch = async (
  urlExtension,
  url = 'https://lit-beyond-77487.herokuapp.com'
) => {
  return fetch(url + urlExtension, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
