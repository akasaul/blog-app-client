import React from 'react'
import {MdDot, MdOutlineFavoriteBorder} from 'react-icons/md';
import {BsDot } from 'react-icons/bs'

function Comment() {
  return (
    <div className='flex gap-4'>
      <img className='h-[30px] rounded-full w-[30px] ' src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tommy-shelby-cillian-murphy-peaky-blinders-1569234705.jpg?crop=0.727xw:0.484xh;0.273xw,0.0232xh&resize=768:*" alt="" />

      <div>
        <div className="border rounded-lg p-3 bg-white">

          <div>
            <p>Nikodimos Jemaneh</p>
            <BsDot />
            <p>Mar 20</p>
          </div>
          <p>
            Challenges and problems are what keep me motivated. Nothing worse than boring, handle turning programming that always works. Solving problems is (or should be) what we do. The job would be boring otherwise.
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