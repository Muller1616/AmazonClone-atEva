import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:5001/clone-d68d3/us-central1/api', // The API (cloud function) URL
  // deployed version of function backend
  // baseURL:'https://api-qlhlims4dq-uc.a.run.app/'

// deployed version of backend render 
  baseURL: 'https://amazon-api-deploy-28zg.onrender.com/'
});
export { axiosInstance };