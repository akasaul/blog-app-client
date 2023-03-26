import React from 'react'
import { Link } from 'react-router-dom'
import {BsDot} from 'react-icons/bs';
import { useSelector } from 'react-redux';

function Footer() {
  const {post} = useSelector(state => state.post);

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
          <BsDot className='text-gray-500' size={20} />
        </li>

        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Profile</Link>
          <BsDot className='text-gray-500' size={20} />
        </li>

        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Contact</Link>
          <BsDot className='text-gray-500' size={20} />
        </li>

        <li className='flex items-center'>
          <Link to={'/'} className='text-textHover'>Github</Link>
          <BsDot className='text-gray-500' size={20} />
        </li>

        <li className='flex items-center'>
          <a href='http://t.me/NJK47' target='_blank' className='text-textHover'>Telegram</a>
          <BsDot className='text-gray-500' size={20} />
        </li>

        <li className='flex items-center'>
          <a href='mailto: nikodimosjemaneh40@gmail.com'  
          className='text-textHover'>Email</a>
            <BsDot className='text-gray-500' size={20} /> 
        </li>

        <li className='flex items-center'>
          <a href='tel: 0968600496'  className='text-textHover'>Phone</a>
        </li>

      </ul>

    </div>
  )
}

export default Footer