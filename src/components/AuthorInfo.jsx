import React from 'react'

function AuthorInfo() {
  return (
    <div className='flex gap-3'>
      <img className='max-h-[40px] w-[40px] object-contain rounded-full' src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tommy-shelby-cillian-murphy-peaky-blinders-1569234705.jpg?crop=0.727xw:0.484xh;0.273xw,0.0232xh&resize=768:*" alt="" />
       
        <div>
          <p className='text-sm text-gray-800 font-bold'>Nikodimos Jemaneh</p>
          <p className='text-xs text-gray-600'>Posted On Mar 19</p>
      </div>
    </div>
  )
}

export default AuthorInfo