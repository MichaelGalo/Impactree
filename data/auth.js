import { fetchWithResponse } from './fetcher';

export const login = (user) => fetchWithResponse('login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

export const register = (user) => fetchWithResponse('register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

export const getUserProfile = (userId) => fetchWithResponse(`users/${userId}`, {
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,
  },
});

export const getUsers = () => fetchWithResponse("users", {
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`
  }
});