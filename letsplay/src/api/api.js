import axios from 'axios';
// import { API_BASE_URL } from '../utils/constants';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('letsplay_token')}`;

const api = axios.create({
  baseURL: 'http://localhost:3030',
});

export default api;
