import { useState } from 'react'
import Comment from './Comment'

function Comments() {
  
  const [comment, setComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(comment);
    setComment('');
  }

  return (
    <section className='my-10 border w-full bg-accent'>
      
      <div className='max-w-[90%] flex flex-col gap-5 mx-auto p-4'>

        <h1 className='text-lg font-bold'>Top Comments (6)</h1>
        
        <div className='flex gap-5 mb-5'>

          <img className='h-[30px]  rounded-full w-[30px] ' src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tommy-shelby-cillian-murphy-peaky-blinders-1569234705.jpg?crop=0.727xw:0.484xh;0.273xw,0.0232xh&resize=768:*" alt="" />

        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
            
            <textarea name="comment" value={comment}
            onChange={e => setComment(e.target.value)} placeholder='Add to discussion' cols="30" rows="2" className='flex-1 w-full focus:outline-textHover p-2'>
            </textarea>

            <div className='flex gap-2'>
              <button type='submit' className='bg-textHover p-2 rounded-lg text-white'>Submit</button>
              <button type='button' className='bg-white p-2 rounded-lg text-textHover border border-textHover'
              onClick={() => setComment('')}>Cancel</button>
            </div>

        </form>

        </div>

        <div>
          <Comment />
          <Comment />
        </div>

      </div>
    
    </section>
  )
}

export default Comments