import axios from 'axios';

const axiosServices = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true
  // headers: {
  //   Authorization: `${serviceToken}` // Include authorization header with the token
  // }
});
// ==============================|| AXIOS - FOR MOCK SERVICES |============================== //

axiosServices.interceptors.request.use(
  (config) => {
    const serviceToken = localStorage.getItem('serviceToken');
    if (serviceToken) {
      config.headers['Authorization'] = serviceToken;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/')) {
      window.location.pathname = '/';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;
