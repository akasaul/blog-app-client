import React, { useEffect } from 'react'
import Markdown from 'marked-react'

function Content({post}) {
  return (
    <div className='flex flex-col gap-2'>

      <p className='text-lg font-[600] text-start w-full'>{post?.header}</p>

      <div className='flex gap-2 text-gray-700 mb-3'>
        {
            post?.tags?.split(',')?.map(tag => 
              <p key={Date.now()} className='p-1 px-3 text-sm'>#{tag} 
              </p>  
            )
        }
      </div>

      <p className='text-md text-justify'>
      <Markdown>{post && post?.content?.replaceAll('##', '\n##')}</Markdown>
      </p>

    </div>
  )
}

export default Content