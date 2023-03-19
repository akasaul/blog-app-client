import React from 'react'
import AuthorInfo from '../components/AuthorInfo'
import Content from '../components/Content'

function Details() {
  return (
    <div className='bg-white max-w-[1000px] border flex flex-col mx-auto'>
      
      <div className='h-[250px]'>
        <img className='h-full w-full rounded-t-lg object-cover object-top' src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tommy-shelby-cillian-murphy-peaky-blinders-1569234705.jpg?crop=0.727xw:0.484xh;0.273xw,0.0232xh&resize=768:*"  alt="" />
      </div>
      
      <div className='p-6 flex gap-5 flex-col'>
        <div className='max-w-[95%] mx-auto'>
          <AuthorInfo />
          <Content />
        </div>
      </div>

    </div>
  )
}

export default Details