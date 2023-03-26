import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../utils/API_URI';

function AuthorInfo({user, postedAt}) {

  const navigate = useNavigate();

  const date = new Date(postedAt).toDateString().split(' ');

  return (
    <div className='flex gap-3'>
      {
        user?.profileImg ? 
        <img onClick={() => navigate(`/profile/${user?.id}`)} className='h-[40px] hover:cursor-pointer w-[40px] object-cover rounded-full' src={`${API_URL}/${user?.profileImg}`} alt="" /> : 
        <span onClick={() => navigate(`/profile/${user?.id}`)} className='bg-gradient-to-r hover:cursor-pointer grid place-content-center font-bold border w-[40px] h-[40px]
        rounded-full from-slate-300 to-green-500'>{user?.name?.slice(0, 1)}</span>
      }
       
        <div>
          <Link to={`/profile/${user?.id}`} className='text-sm text-gray-800 hover:text-textHover font-bold'>{user?.name}</Link>
          <p className='text-xs text-gray-600'>Posted On {`${date[1]} ${date[2]}`}</p>
      </div>
    </div>
  )
}

export default AuthorInfo