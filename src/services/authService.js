import apiCall from './api';

export const login = async (email, password) => {
  return apiCall('/auth/login', 'POST', {
    email,
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

