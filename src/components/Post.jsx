import React from 'react'
import { Link } from 'react-router-dom'
import { MdBookmarkBorder, MdComment, MdFavorite, MdOutlineComment, MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

const Post = () => {
  return (
    <div className='border rounded-md p-4 my-2 bg-white'>
      <div className='flex gap-5 text-gray-800'>
        <img className='max-h-[40px] w-[40px] object-contain rounded-full' src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tommy-shelby-cillian-murphy-peaky-blinders-1569234705.jpg?crop=0.727xw:0.484xh;0.273xw,0.0232xh&resize=768:*" alt="" />
       
       <div>
       
        <div>
          <p className='text-sm'>Nikodimos Jemaneh</p>
          <p className='text-xs'>Mar 19</p>
        </div>

        <div>
          <Link to={'/posts/id'} className='text-[24px] hover:text-blue-800 cursor-pointer font-[600] text-start'>Typescript for Beginners: What You Should Know</Link>

          <div className='flex text-gray-700'>
            <p className='p-1 px-3 text-sm'>#webdev</p>
            <p className='p-1 px-3 text-sm'>#typescript</p>
            <p className='p-1 px-3 text-sm'>#programming</p>
          </div>

          <div className='flex justify-between my-5'>

            <div className='flex items-center gap-5'>
              
              <span className='flex text-sm items-center gap-4 text-gray-700'>
                <MdOutlineFavoriteBorder  size={18} />
                66 reactions
              </span>

              <span className='flex text-sm items-center gap-4 text-gray-700'>
                <MdOutlineComment size={18} />
                1 comment
              </span>

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