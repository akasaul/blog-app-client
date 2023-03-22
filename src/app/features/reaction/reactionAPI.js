import axios from "axios";

const API_URL = 'http://localhost:5000/reaction';

const postReaction = async (formData, token) => {

  const res = await axios.post(`${API_URL}/${formData.id}`, {type: formData.type}, {
    headers: {
        'token': `Bearer ${token}`
    }
  });
  
  return res.data;
}

// const deleteComment = async (id, token) => {

//   const res = await axios.delete(`${API_URL}/${id}`, {
//     headers: {
//         'token': `Bearer ${token}`
//     }
//   });
  
//   return res.data;
// }


export default {postReaction}