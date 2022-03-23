import axios from 'axios';
// import { API_BASE_URL } from '../utils/contants';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('letsplay_token')}`;

const api = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: 'http://localhost:3030',
});

export default api;
