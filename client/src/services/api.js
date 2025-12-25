import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : '/api';

// Add a token to every request if the user is logged in
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;