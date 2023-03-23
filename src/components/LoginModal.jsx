import React from 'react'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'

function LoginModal({setShowModal, message}) {
  return (
    <>
      <div className='bg-gray-800 opacity-10 fixed top-0 bottom-0 right-0 left-0
      '>
        </div>
        <div className='absolute z-40 max-w-[700px]  mx-auto rounded-lg border p-5 bg-white opacity-100 top-[50px] left-[50px] right-[50px] bottom-[50px]'>
          <div>
            <button onClick={() => setShowModal(false)} className='hover:bg-textHover grid place-content-center hover:text-white rounded-full h-[30px] w-[30px]'>
              <MdClose size={25} />
            </button>
          </div>

          <div className='grid place-content-center'>
            <img src="/signup.jpg" className='max-h-[250px] mx-auto' alt="sign up first" />
            <h2 className='text-center font-sans text-lg text-gray-700 font-bold'>{
              message
            }</h2>
            <div className='grid place-content-center gap-2'>

              <Link to={'/login'} className="hover:text-textHover text-gray-500">Already Have An Account?</Link>
             
              <Link to={'/signup'} className='text-md text-gray-600 gap-2 items-center px-3 py-1 text-center bg-blue-100 rounded-lg hover:text-textHover hover:underline'>
                Login
              </Link>

              <Link to={'/signup'} className="hover:text-textHover text-gray-500 text-center">or</Link>

              <Link to={'/login'} className='text-md text-gray-600 gap-2 items-center px-3 py-1 text-center bg-blue-100 rounded-lg hover:text-textHover hover:underline'>
                Sign in
              </Link>

            </div>
          
          </div>

        </div>
    </>
  )
}

export default LoginModal