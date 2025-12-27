import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:5001/clone-d68d3/us-central1/api', // The API (cloud function) URL
  baseURL:'https://api-qlhlims4dq-uc.a.run.app/'
});
export { axiosInstance };