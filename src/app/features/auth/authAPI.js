import axios from "axios";

const API_URL = 'https://blog-app-backend-production-53d9.up.railway.app/auth';

const signup = async (formData) => {
  const res = await axios.post(API_URL + '/signup', formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
  });
  
  return res.data;
}


const login = async (formData) => {
  const res = await axios.post(API_URL + '/signin', formData);
  
  return res.data;
}



export default {signup, login}