import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { log } from "./logService";

let token = null;
let headers = {};
token = localStorage.getItem('token');

function ValidToken(accessToken) {
  // const history = useHistory();
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  let result = decoded.exp > currentTime;

  if (result > 0) return true;
  else {
    // history.push('/login');
    window.history.push('/login');
    return false;
  }
}

if (token && ValidToken(token)) {
  headers['Authorization'] = `Bearer ${token}`;
}
if (token && !ValidToken(token)) {
  history.push('/login');
}
axios.defaults.headers.common = headers;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // log(error);
    // toast.error('An unexpected error happened!');
    console.log(error);
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
