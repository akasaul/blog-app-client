import React from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'

function Main() {
  return (
    <div className='flex-1'>
      {/* Filter  */}
      <ul className='flex gap-2 pl-5 font-semiBold text-gray-500'>
        <li className='hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 grid place-content-center'>
          <Link to={'/relevant'}>Relevant</Link>
        </li>
        <li className='hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 grid place-content-center'>
          <Link to={'/latest'}>Latest</Link>
        </li>
        <li className='hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 grid place-content-center'>
          <Link to={'/latest'}>Top</Link>
        </li>
      </ul>
      {/* Posts */}
     
      <div>
        <Post />
        <Post />
        <Post />

      </div>

    </div>
  )
}

export default Main