import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdBookmarkBorder, MdComment, MdFavorite, MdOutlineComment, MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import useAuthStatus from '../hooks/useAuthStatus'

// const Post = ({username, comments, time, tags,avatar, setShowModal, header, id}) => {

const Post = ({post, setShowModal}) => {

  const { isLoggedIn } = useAuthStatus();

  const handleLike = () => {
    if(!isLoggedIn) { 
      setShowModal(true);
    }
  }

  const date = new Date(post?.createdAt).toDateString().split(' ');


  return (
    <div className='border rounded-md p-4 my-2 bg-white'>

      <div className='flex gap-5 text-gray-800'>
        {
          post?.user?.profileImg ?
          <img className='max-h-[40px] w-[40px] object-contain rounded-full' src={`http://localhost:5000/${post?.user?.profileImg}`} alt="" /> : 
          <span className='bg-gradient-to-r grid place-content-center font-bold border w-[40px] h-[40px]
          rounded-full from-slate-300 to-green-500'>{post?.user?.username?.slice(0, 1)}</span>
        }
       
       <div className='flex-1'>
       
        <div>
          <p className='text-sm'>{post?.user?.username }</p>
          <p className='text-xs'>{`${date[1]} ${date[2]}`}</p>
        </div>

        <div>
          <Link to={`/posts/${post?.id}`} className='text-[24px] hover:text-blue-800 cursor-pointer font-[600] text-start'>{post?.header}</Link>

          <div className='flex text-gray-700'>
           {
              post?.tags.split(',').map(tag => 
                <p className='p-1 px-3 text-sm'>#{tag} 
                </p>  
              )
            }
          </div>

          <div className='flex justify-between my-5'>

            {/* Desktop View stats  */}
            <div className='hidden sm:flex items-center gap-5'>
              
              <button className='flex hover:text-textHover cursor-pointer text-sm items-center gap-4 text-gray-700' onClick={handleLike}>
                <MdOutlineFavoriteBorder  size={18} />
                {post?.reactions?.length} reactions
              </button>

              <Link to={`posts/${post?.id}/#comments`} className='flex text-sm items-center gap-4 text-gray-700 cursor-pointer'>
                <MdOutlineComment size={18} />
                {
                  post?.comments.length === 0 ? 
                  'No comments' :
                  post?.comments.length === 1 ? 
                  '1 comment': 
                  `${post?.comments.length} comments`
                }
              </Link>

            </div>

            {/* Mobile View Stats  */}
            <div className='flex sm:hidden items-center gap-5'>
              
              <button className='flex hover:text-textHover cursor-pointer text-sm items-center gap-4 text-gray-700' onClick={handleLike}>
                <MdOutlineFavoriteBorder  size={18} />
                {post?.reactions?.length}
              </button>

              <Link to={`posts/${post?.id}/#comments`} className='flex text-sm items-center gap-4 text-gray-700 cursor-pointer'>
                <MdOutlineComment size={18} />
                {
                  post?.comments?.length === 0 ? 
                  '0' :
                  post?.comments?.length === 1 ? 
                  '1': 
                  `${post?.comments?.length}`
                }
              </Link>

            </div>


            <span className='flex items-center gap-3 text-sm text-gray-700'>
              {post?.content?.length / 60 < 1 ? parseInt(post?.content?.length / 60 * 100) + ' second read' : 
              parseInt(post?.content?.length / 60) +  " minute read" 
               } 
                <MdBookmarkBorder size={24} />
            </span>

          </div>  

        </div>

       </div>

      </div>

    </div>
  )
}

export default Post