import React from 'react'
import { Link } from 'react-router-dom'
import {BsDot} from 'react-icons/bs';

function Footer() {
  return (
    <div className='bg-white text-[15px] border mt-[100px] rounded-lg  p-3 flex items-center flex-col'>
      <p className='flex flex-col sm:flex-row gap-3'>
        <Link className='text-textHover' to={'/'}>
          Niko Blog
        </Link>

        -- A Portfolio Blog Project made by Nikodimos
      </p>

      <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Home</Link>
          <BsDot size={20} />
        </li>

        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Profile</Link>
          <BsDot size={20} />
        </li>

        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Contact</Link>
          <BsDot size={20} />
        </li>

        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Github</Link>
          <BsDot size={20} />
        </li>

        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Telegram</Link>
          <BsDot size={20} />
        </li>

        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Email</Link>
          <BsDot size={20} />
        </li>


      </ul>

    </div>
  )
}

export default Footer