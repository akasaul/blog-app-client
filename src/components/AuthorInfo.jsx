import React from 'react'

function AuthorInfo({user}) {

  return (
    <div className='flex gap-3'>
      {
        user?.profileImg ? 
        <img className='max-h-[40px] w-[40px] object-contain rounded-full' src={`http://localhost:5000/${user?.profileImg}`} alt="" /> : 
        <span className='bg-gradient-to-r grid place-content-center font-bold border w-[40px] h-[40px]
        rounded-full from-slate-300 to-green-500'>{user?.username?.slice(0, 1)}</span>
      }
       
        <div>
          <p className='text-sm text-gray-800 font-bold'>{user?.name}</p>
          <p className='text-xs text-gray-600'>Posted On Mar 19</p>
      </div>
    </div>
  )
}

export default AuthorInfo