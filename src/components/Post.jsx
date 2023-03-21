import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdBookmarkBorder, MdComment, MdFavorite, MdOutlineComment, MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import useAuthStatus from '../hooks/useAuthStatus'

const Post = ({username, comments, tags,avatar, setShowModal, header, id}) => {

  const { isLoggedIn } = useAuthStatus();

  const handleLike = () => {
    if(!isLoggedIn) { 
      setShowModal(true);
    }
  }

  return (
    <div className='border rounded-md p-4 my-2 bg-white'>

      <div className='flex gap-5 text-gray-800'>
        {
          avatar ?
          <img className='max-h-[40px] w-[40px] object-contain rounded-full' src={`http://localhost:5000/${avatar}`} alt="" /> : 
          <span className='bg-gradient-to-r grid place-content-center font-bold border w-[40px] h-[40px]
          rounded-full from-slate-300 to-green-500'>{username?.slice(0, 1)}</span>
        }
       
       <div className='flex-1'>
       
        <div>
          <p className='text-sm'>{username}</p>
          <p className='text-xs'>Mar 19</p>
        </div>

        <div>
          <Link to={`/posts/${id}`} className='text-[24px] hover:text-blue-800 cursor-pointer font-[600] text-start'>{header}</Link>

          <div className='flex text-gray-700'>
           {
              tags.split(',').map(tag => 
                <p className='p-1 px-3 text-sm'>#{tag} 
                </p>  
              )
            }
          </div>

          <div className='flex justify-between my-5'>

            <div className='hidden sm:flex items-center gap-5'>
              
              <button className='flex hover:text-textHover cursor-pointer text-sm items-center gap-4 text-gray-700' onClick={handleLike}>
                <MdOutlineFavoriteBorder  size={18} />
                66 reactions
              </button>

              <Link to={`posts/${id}/#comments`} className='flex text-sm items-center gap-4 text-gray-700 cursor-pointer'>
                <MdOutlineComment size={18} />
                {
                  comments.length === 0 ? 
                  'No comments' :
                  comments.length === 1 ? 
                  '1 comment': 
                  `${comments.length} comments`
                }
              </Link>

            </div>

            <div className='flex sm:hidden items-center gap-5'>
              
              <button className='flex hover:text-textHover cursor-pointer text-sm items-center gap-4 text-gray-700' onClick={handleLike}>
                <MdOutlineFavoriteBorder  size={18} />
                66
              </button>

              <Link to={`posts/${id}/#comments`} className='flex text-sm items-center gap-4 text-gray-700 cursor-pointer'>
                <MdOutlineComment size={18} />
                {
                  comments.length === 0 ? 
                  '0' :
                  comments.length === 1 ? 
                  '1': 
                  `${comments.length}`
                }
              </Link>

            </div>


            <span className='flex items-center gap-3 text-sm text-gray-700'>
              7 min read <MdBookmarkBorder size={24} />
            </span>

          </div>

        </div>

       </div>

      </div>

    </div>
  )
}

export default Post