import React from 'react'
import {MdDot, MdOutlineFavoriteBorder} from 'react-icons/md';
import {BsDot } from 'react-icons/bs'

function Comment({comment}) {
  
  return (
    <div className='flex gap-4'>
      <img className='h-[30px] rounded-full w-[30px] ' src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tommy-shelby-cillian-murphy-peaky-blinders-1569234705.jpg?crop=0.727xw:0.484xh;0.273xw,0.0232xh&resize=768:*" alt="" />

      <div className='w-full'>
        <div className="border rounded-lg p-3 bg-white">

          <div className='flex items-center'>
            <p>{comment.user.name}</p>
            <BsDot />
            <p className='text-xs p-0'>Mar 20</p>
          </div>
          <p>
            {comment?.content}
          </p>

        </div>
    
        <button className='p-1 my-2 px-3 hover:bg-textHover hover:text-white rounded-lg flex items-center gap-2'>
          <MdOutlineFavoriteBorder size={22} />
          7
        </button>

      </div>
    
      
   
    </div>
  )
}

export default Comment