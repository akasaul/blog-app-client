import axios from "axios";

const API_URL = 'https://blog-app-backend-production-53d9.up.railway.app/favorite';

const toggleFav = async (id, token) => {

  const res = await axios.patch(`${API_URL}/${id}`, null, {
    headers: {
        'token': `Bearer ${token}`
    }
  });
    
  return res.data;
}



export default {toggleFav}