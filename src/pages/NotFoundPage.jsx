import React from 'react'
import { MdHome } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'

function NotFoundPage() {
  const params = useParams();

  return (
    <div className='flex flex-col items-center max-w-[800px] mx-auto'>
      <img src="/notfound.png" alt="" />
      <h1>404 <strong>{params['*']}</strong> Page Not Found</h1>
      <Link to={'/'} className='text-textHover hover:underline flex items-center'>Back to Home 
      <MdHome size={22}/></Link>
    </div>
  )
}

export default NotFoundPage