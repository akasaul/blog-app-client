import axios from "axios";

const API_URL = 'http://localhost:5000/user';


const addUserDetails = async (token, id, formData) => {
  return await axios.put(API_URL + '/' + id, formData, {
    headers: {
      'token': `Bearer ${token}`
    }
  })
}

const getMe = async (token) => {
  console.log(token);
  return await axios.get(API_URL + '/getme', {
    headers: {
      'token': `Bearer ${token}`
    }
  })
}


export default {addUserDetails, getMe}