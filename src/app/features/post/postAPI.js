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


const deletePost = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
        "Content-Type": "multipart/form-data",
        'token': `Bearer ${token}`
    }
  });
  
  return res.data;
}

const updatePost = async (formData, id, token) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
        "Content-Type": "multipart/form-data",
        'token': `Bearer ${token}`
    }
  });
  
  return res.data;
}


const getPosts = async (category) => {
  const res = await axios.get(`${API_URL}?category=${category}`);
  
  return res.data;
}


const getPost = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  
  return res.data;
}



export default {createPost, getPosts, getPost, deletePost, updatePost}