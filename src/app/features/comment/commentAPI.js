import axios from "axios";

const API_URL = 'http://dizzy-toothpaste-production.up.railway.app/comment';

const postComment = async (formData, token) => {

  const res = await axios.post(API_URL, formData, {
    headers: {
        'token': `Bearer ${token}`
    }
  });
  
  return res.data;
}

const deleteComment = async (id, token) => {

  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
        'token': `Bearer ${token}`
    }
  });
  
  return res.data;
}


export default {postComment, deleteComment}