import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.2.69.250:8080',
});

// Set up an interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage, session storage, or context
    const token = localStorage.getItem('token'); // Or wherever you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
