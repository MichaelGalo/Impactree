const baseUrl = 'http://localhost:8000';

const checkError = (response) => {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
};

const checkErrorJson = (response) => {
  if (response.status !== 200) {
    throw Error(response.status);
  }
  return response.json();
};

const catchError = (err) => {
  if (err.message === '401') {
    window.location.href = '/login';
  }
  if (err.message === '404') {
    throw Error(err.message);
  }
};

export const fetchWithResponse = (resource, options) => 
  fetch(`${baseUrl}/${resource}`, options)
    .then(checkErrorJson)
    .catch(catchError);

export const fetchWithoutResponse = (resource, options) => 
  fetch(`${baseUrl}/${resource}`, options)
    .then(checkError)
    .catch(catchError);