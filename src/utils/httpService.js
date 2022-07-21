import axios from 'axios';
// import { toast } from "react-toastify";
// import { log } from "./logService";

// let token = null;
// let headers = {};
// token = localStorage.getItem('token');
// if (token) {
//   headers['Authorization'] = `Bearer ${token}`;
// }
// axios.defaults.headers.common = headers;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    log(error);
    toast.error('An unexpected error happened!');
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
