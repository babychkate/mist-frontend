import axiosInstance from './axiosInstance';

export const loginRequest = (credentials) =>
  axiosInstance.post('/auth/login', credentials);

export const logoutRequest = () =>
  axiosInstance.post('/auth/logout');