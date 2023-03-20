import React, { useEffect } from 'react'

function Content({post}) {
  useEffect(() => {}, []);
  return (
    <div className='flex flex-col gap-2'>

      <p className='text-lg font-[600] text-start'>{post?.header}</p>

      <div className='flex gap-2 text-gray-700 mb-3'>
        {
            post?.tags?.split(',')?.map(tag => 
              <p className='p-1 px-3 text-sm'>#{tag} 
              </p>  
            )
        }
      </div>

      <p className='text-md text-justify'>
        {post?.content}
      </p>

      <p className='text-md text-justify'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatem expedita tempore! Adipisci sed optio veritatis temporibus magni et sunt aut asperiores quod eligendi? Voluptate ratione nesciunt consequatur et voluptatibus? Necessitatibus assumenda praesentium porro in iure ratione, debitis, laboriosam odit suscipit, labore nemo! Velit voluptatum unde, distinctio ab adipisci vero odio maxime, delectus, magnam dolorum est hic provident? Magnam illo fuga laborum officia soluta asperiores, nemo, repudiandae itaque voluptate sint distinctio nihil corporis cupiditate quaerat ducimus voluptates error repellat. Quidem eligendi aut quo? Consequuntur minus harum, repudiandae aut unde nesciunt sed ab molestias veniam sint dolorem deserunt incidunt tempore perferendis?
      </p>

    </div>
  )
}

export default Content