import axios from 'axios';
import jwtDecode from 'jwt-decode';

let token = null;
let headers = {
  'Cache-Control': 'no-cache'
};
token = localStorage.getItem('token');

function ValidToken(accessToken) {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
}

if (token && ValidToken(token)) {
  headers['Authorization'] = `Bearer ${token}`;

  axios.defaults.headers.common = headers;
  // axios.rejectUnauthorized = false;
  // axios.requestCert = false;
  // axios.agent = false;
}
if (token && !ValidToken(token)) {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common.Authorization;
  window.history.pushState({ urlPath: '/login' }, '', '/login');
}
axios.defaults.headers.common = headers;
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log(error);
  } else if (error?.response?.status === 417) {
  } else if (error?.response?.status === 401) {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
    window.location.href = '/login';
  }

  return Promise.reject(error);
});

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};

export default httpService;
