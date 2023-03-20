import axios from "axios";

const API_URL = 'http://localhost:5000/comment';

const postComment = async (formData, token) => {

  const res = await axios.post(API_URL, formData, {
    headers: {
        'token': `Bearer ${token}`
    }
  });
  
  return res.data;
}


// const getPosts = async () => {
//   const res = await axios.get(API_URL);
  
//   return res.data;
// }


// const getPost = async (id) => {
//   const res = await axios.get(`${API_URL}/${id}`);
  
//   return res.data;
// }



export default {postComment}