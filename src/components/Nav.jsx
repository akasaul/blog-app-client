import { MdClose, MdFacebook, MdHome, MdList, MdMenu, MdMic, MdMore, MdSearch, MdTag} from 'react-icons/md'

import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

import Avatar from './Avatar';

import { Link, useNavigate } from 'react-router-dom'

import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import useAuthStatus from '../hooks/useAuthStatus';

function Nav() {
  const [show, setShow] = useState(false);
  const {user}  = useSelector(state => state.auth);
  const {posts, isSuccess}  = useSelector(state => state.post);
  

  const { isLoggedIn, checkingStatus } = useAuthStatus();
  const [searchResults, setSearchResults] = useState();
  const [showResults, setShowResults] =  useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);


  const [clickedOutside, setClickedOutside] = useState(false);
  const myRef = useRef();

  const navigate = useNavigate();


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  useEffect(() => {
    setSearchResults(posts);
  }, [isSuccess]);

  const toDate = (date) => {
    return  new Date(date).toDateString().split(' ');
  }


  const handleClickOutside = e => {
      if (!myRef.current?.contains(e.target)) {
          setClickedOutside(true);
      }
  };


  const handleSearch = (e) => {

    setClickedOutside(false);

    if(e.target.value.length > 0) {
      setShowResults(true);
    }  else {
      setShowResults(false);
    }

    setSearchResults(posts?.filter(post => (
      post?.header?.toLowerCase()?.includes(e.target.value.toLowerCase())  ||
      post?.content?.toLowerCase()?.includes(e.target.value.toLowerCase())  ||
      post?.user?.username?.toLowerCase()?.includes(e.target.value.toLowerCase())  ||
      post?.user?.name?.toLowerCase()?.includes(e.target.value.toLowerCase())  ||
      post?.comments?.content?.toLowerCase()?.includes(e.target.value.toLowerCase())
    )
    )?.sort((a, b) => (
      a?.comments?.length - b?.comments?.length ||
      a?.favorite?.length - b?.favorite?.length 
    )))
  }

  const handleClick = (id) => {
    setShowResults(false)
    navigate(`/posts/${id}`);
    window.location.reload();
  }

  return (
    <nav className='border-b-2 bg-primary'>

      {/* Container  */}
      
      <div className="container border-b bg-white max-w-[1200px] mx-auto flex justify-between px-4 py-2">

          <div className='flex top items-center gap-3'>

            <button className='hover:text-textHover md:hidden hover:bg-blue-100 h-full px-2 rounded-md' onClick={() => setShow(true)}>
              <MdMenu size={28} />
            </button>

            <Link to='/' className=''>
              <img src="/resized_logo_UQww2soKuUsjaOGNB38o.png" className='h-10' alt="Nav Logo" />
            </Link>

              {/* Search Desktop */}
            <div className='relative w-[400px] hidden md:block'>
           
              <input type="text" name='search' onFocus={() => navigate('/')} onChange={handleSearch} placeholder='Search..' className='border outline-1 outline-textHover w-full rounded-md py-[5px] px-2'/>
              
              <button className='hover:bg-blue-100 absolute top-0 hover:text-textHover rounded-md right-0 bottom-0 px-[5px]'>
                <MdSearch size={24} />
              </button>
             
              {
                showResults && searchResults.length > 0 && !clickedOutside &&
                <ul ref={myRef} className='absolute z-[100] border rounded-md bg-white right-0 left-0 p-3'>
                  <li>
                    {
                      searchResults?.map((post, index) => (
                        index < 4 &&
                        <Link key={index + post?.header + Date.now()} onClick={() => handleClick(post?.id)} className='p-2 hover:bg-accent hover:text-textHover block rounded-lg hover:underline'>
                          <h2 className='text-md font-bold'>{post?.header}</h2>
  
                          <div className='text-xs flex gap-5 text-gray-600'>
                            <p>@ {post?.user?.username}</p>
                            <p>{toDate(post?.createdAt)[1] + ' ' + toDate(post?.createdAt)[2] }</p>
                          </div>
  
                        </Link>
                      )
                      )
                    }
                </li>
              </ul>
            
              }

            </div>

          </div>

          <div className='flex gap-2 items-center'>
            
            {
              !isLoggedIn ? 
              <Link to='/login' className='text-md md:flex gap-2 items-center px-3 py-1 hover:bg-blue-100 hover:text-textHover hover:underline hidden'>
                Login
              </Link>: 
              <a href='/new' className='text-md md:flex text-textHover hidden gap-2 items-center border px-3 py-1 rounded-lg border-textHover hover:bg-textHover hover:text-primary hover:underline'>
                Create Post
              </a>  

            }


            <div className='flex relative items-center md:hidden gap-3'>
              {
                showSearchBar &&
                <input type="text" name='search' onFocus={() => navigate('/')} onChange={handleSearch} placeholder='Search..' className='border outline-1 outline-textHover rounded-md py-[5px] sm:max-w-[500px] max-w-[120px] px-2 sm '/>
              }
              
              <MdSearch size={30} className=' hover:cursor-pointer' onClick={() => setShowSearchBar(prev => !prev)} />
              
              {
                 showResults && searchResults.length > 0 && !clickedOutside &&
                 <ul ref={myRef} className='absolute z-[100] border rounded-md bg-white top-10 right-0 left-0 p-3'>
                   <li>
                     {
                       searchResults?.map((post, index) => (
                         index < 3 &&
                         <Link key={index + post?.header + Date.now()} onClick={() => handleClick(post?.id)} className='p-2 hover:bg-accent hover:text-textHover block rounded-lg hover:underline'>
                           <h2 className='text-md font-bold'>{post?.header}</h2>
   
                           <div className='text-xs flex gap-5 text-gray-600'>
                             <p>@ {post?.user?.username}</p>
                             <p>{toDate(post?.createdAt)[1] + ' ' + toDate(post?.createdAt)[2] }</p>
                           </div>
   
                         </Link>
                       )
                       )
                     }
                 </li>
               </ul>
             
              }
              
            </div>

            { 
             user ?
               <Avatar imgUrl={user?.profileImg} username={user?.username} id={user?.id} />:
              <Link to='/signup' className='text-md text-textHover flex gap-2 items-center border px-3 py-1 rounded-lg border-textHover hover:bg-textHover hover:text-primary hover:underline'>
                Create Account
              </Link> 
               
            }

          </div>

        
        {/* Side bar  */}
        
          <section className='fixed z-[100] block md:hidden' 
            style={{
              transform: !show && 'translateX(-3000px)',
              transition: 'transform ease-in-out 500'
            }}
          >
            
            {/* overlay  */}

            <div className='fixed top-0 bottom-0 bg-neutral-600 opacity-50 left-0 right-0'
            >
            </div>

            <article className='fixed p-3 max-w-[300px] bg-primary top-0 bottom-0 left-0'>
            
              <h3 className='flex text-md font-bold items-center justify-between'>
                Niko Community
                
                <button className='h-10 w-10 rounded-md text-center grid place-content-center hover:text-textHover hover:bg-blue-100' onClick={() => setShow(false)}>
                  <MdClose size={22} />
                </button>

              </h3 >
              
              <main className='mt-5'>

                <div className="flex flex-col gap-5 px-3">
                  <h3 className='font-bold'>
                    Niko Blog is a community of amazing developers 
                  </h3>

                  <p className='text-gray-600'>
                    We're a place where coders share, stay up-to-date and grow their careers
                  </p>

                  <div className='flex flex-col gap-1'>

                    {
                      !isLoggedIn ? 
                      <>
                      <Link to='/signup' className='text-md text-textHover flex gap-2 items-center border px-3 py-1 rounded-lg border-textHover hover:bg-textHover w-full justify-center hover:text-primary hover:underline'>
                        Create Account
                      </Link>

                      <Link to="/login" className='text-gray-500 hover:text-textHover hover:bg-blue-100 hover:underline rounded-md py-2 w-full text-center'>
                        Login
                      </Link>
                      </>: 

                      <a href='/new' className='text-md text-textHover flex gap-2 items-center border px-3 py-1 rounded-lg border-textHover hover:bg-textHover w-full justify-center hover:text-primary hover:underline'>
                       Create Post
                     </a>
                    }

                  </div>

                </div>

                <ul>
                
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
                      <a target='_blank' href="https://github.com/akasaul" className='text-gray-600 hover:text-textHover'>
                        <FaGithub size={24} />
                      </a>
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


          </section>

      </div>

    </nav>
  )
}

export default Nav