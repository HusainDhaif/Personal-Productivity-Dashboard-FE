import apiCall from './api';

export const login = async (username, password) => {
  return apiCall('/auth/login', 'POST', {
    username,
    password,
  });
};

export const register = async (username, email, password) => {
  return apiCall('/auth/register', 'POST', {
    username,
    email,
    password,
  });
};

