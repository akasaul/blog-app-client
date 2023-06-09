import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom"
import { signOut } from "../app/features/auth/authSlice";
import { API_URL } from "../utils/API_URI";

function Avatar({imgUrl, username, id}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth)

  const handleSignOut = (e) => {
    dispatch(signOut());
    window.location.href = '/login';
  }
 
  return (
    <button className="relative avatar">
      {
        imgUrl ?
        <img  className="hover:shadow-md hover:shadow-blue-700 h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] object-cover rounded-full" src={`${API_URL}/${imgUrl}`} /> :
        <div  className="hover:shadow-md hover:shadow-blue-700 bg-blue-400 px-2 py-2 h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] rounded-full font-bold">{username?.slice(0, 1)}</div>
      }

      <div className="bg-white profile-details absolute right-[40px] p-3 w-[300px] top-[20px] z-[31] border rounded-lg">

        <div className="border-b py-2">
          <Link to={'/profile'} className="hover:bg-textHover p-3 hover:underline hover:text-white w-full flex flex-col items-start rounded-lg py-2">
            <span>{user?.name}</span>
            <span className="text-sm">{user?.username}</span>
          </Link>
        </div>

        <div className="border-b py-2">

          <Link to={'/new'} className="hover:bg-textHover p-3 hover:underline hover:text-white w-full flex flex-col items-start rounded-lg py-2">
            Create post
          </Link>

          <Link to={'/signup/add-details'} className="hover:bg-textHover p-3 hover:underline hover:text-white w-full flex flex-col items-start rounded-lg py-2">
            Edit Profile
          </Link>
      
      </div>


        <button onClick={handleSignOut} className="hover:bg-textHover p-3 hover:underline hover:text-white w-full flex flex-col items-start rounded-lg my-2 py-2">
          Sign Out
        </button>
      
      </div>
    </button>
  )
}

export default Avatar;