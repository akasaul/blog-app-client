import axios from "axios";

const API_URL = 'http://localhost:5000/post';

const createPost = async (formData, token) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
        "Content-Type": "multipart/form-data",
        'token': `Bearer ${token}`
    }
  });
  
  return res.data;
}


const getPosts = async () => {
  const res = await axios.get(API_URL);
  
  return res.data;
}




export default {createPost}