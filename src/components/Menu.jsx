import React from 'react'
import { MdClose,  MdHome, MdList, MdMic, MdTag, MdMore} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import useAuthStatus from '../hooks/useAuthStatus';

function Menu() {
  const { isLoggedIn, checkingStatus } = useAuthStatus();
  return (
    <>

{/* overlay  */}
    <article className='p-3 pb-5 border sticky top-0 hidden md:block rounded-lg max-w-[250px] bg-primary'>

      <h3 className='flex text-md font-bold items-center justify-between'>
        Dev Community
      </h3 >
      
      <main className='mt-5'>

        <div className="flex flex-col gap-5 px-3">
          <h3 className='font-bold'>
            DEV Community is a community of 1,022,645 amazing developers 
          </h3>

          <p className='text-gray-600'>
            We're a place where coders share, stay up-to-date and grow their careers
          </p>

          {
            !isLoggedIn ?
            <div className='flex flex-col gap-1'>

              <Link to='/signup' className='text-md text-textHover flex gap-2 items-center border px-3 py-1 rounded-lg border-textHover hover:bg-textHover w-full justify-center hover:text-primary hover:underline'>
                Create Account
              </Link>

              <Link to="/login" className='text-gray-500 hover:text-textHover hover:bg-blue-100 hover:underline rounded-md py-2 w-full text-center'>
                Login
              </Link>

            </div> :
            <a href='/new' className='text-md text-textHover flex gap-2 items-center border px-3 py-1 rounded-lg border-textHover hover:bg-textHover w-full justify-center hover:text-primary hover:underline'>
              Create Post
            </a>
          }


        </div>

        <ul className='mt-4'>
        
          <li className='rounded gap-4
              hover:bg-blue-100 hover:underline py-2 px-2 flex items-end'>
          
            <MdHome size={24} className='border-b-2' />

            <Link to="/" className='hover:text-textHover w-full'>
              Home
            </Link>

          </li>
      
          <li className='rounded gap-4
              hover:bg-blue-100 hover:underline py-2 px-2 flex items-end'>
          
            <MdList  size={24} className='border-b-2' />

            <Link to="/" className='hover:text-textHover w-full'>
              Listing
            </Link>
            
          </li>
      
          <li className='rounded gap-4
              hover:bg-blue-100 hover:underline py-2 px-2 flex items-end'>
          
            <MdMic size={24} className='border-b-2' />

            <Link to="/" className='hover:text-textHover w-full'>
              Podcast
            </Link>
            
          </li>

          <li className='rounded gap-4
              hover:bg-blue-100 hover:underline py-2 px-2 flex items-end'>
          
            <MdTag size={24} className='border-b-2' />

            <Link to="/" className='hover:text-textHover w-full'>
              Tag
            </Link>
            
          </li>

          <li className='rounded gap-4
              hover:bg-blue-100 hover:underline py-2 px-2 flex items-end'>
          
            <MdMore size={24} className='border-b-2' />

            <Link to="/" className='hover:text-textHover w-full'>
              About
            </Link>
            
          </li>

        </ul>

        <ul className='flex justify-between mt-12 max-w-[200px]'>

          <li>
              <Link to="/" className='text-gray-600 hover:text-textHover'>
                <FaTwitter size={24} />
              </Link>
            </li>

            <li>
              <Link to="/" className='text-gray-600 hover:text-textHover'>
                <FaFacebook size={24} />
              </Link>
            </li>

            <li>
              <Link to="/" className='text-gray-600 hover:text-textHover'>
                <FaGithub size={24} />
              </Link>
            </li>

            <li>
              <Link to="/" className='text-gray-600 hover:text-textHover'>
                <FaInstagram size={24} />
              </Link>
            </li>

            <li>
              <Link to="/" className='text-gray-600 hover:text-textHover'>
                <FaLinkedin size={24} />
              </Link>
            </li>

        </ul>

      </main>

    </article>

    </>
  )
}

export default Menu