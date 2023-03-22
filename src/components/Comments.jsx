import { useEffect, useState } from 'react'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../app/features/comment/commentSlice';
import { useNavigate } from 'react-router-dom';

function Comments({post}) {
  
  const [comment, setComment] = useState('');
  const { user } = useSelector(state => state.auth);
  const {comment: newComment, isSuccess, isLoading, errors} = useSelector(state => state.comment);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if(isSuccess) {
      navigate(0);
    }
  }, [isSuccess])

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postComment({content: comment, user: user.id, post: post.id }));
    setComment('');
  }


  return (
    <section className='my-10 border w-full bg-accent' id='comments'>
      
      <div className='max-w-[90%] flex flex-col gap-5 mx-auto p-4'>

        <h1 className='text-lg font-bold'>Top Comments (6)</h1>
        
        <div className='flex gap-5 mb-5'>

        {
          user?.profileImg ?
          <img className='max-h-[30px] w-[30px] object-contain rounded-full' src={`http://localhost:5000/${user?.profileImg}`} alt="" /> : 
          <span className='bg-gradient-to-r grid place-content-center font-bold border w-[30px] h-[30px]
          rounded-full from-slate-300 to-green-500'>{user?.username?.slice(0, 1)}</span>
        }

        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
            
            <textarea name="comment" value={comment}
            onChange={e => setComment(e.target.value)} placeholder='Add to discussion' cols="30" rows="2" className='flex-1 w-full focus:outline-textHover p-2'>
            </textarea>

            <div className='flex gap-2'>
              <button type='submit' className='bg-textHover p-2 rounded-lg text-white'>Submit</button>
              {
                comment.length > 0 &&
                <button type='button' className='bg-white p-2 rounded-lg text-textHover border border-textHover'
                onClick={() => setComment('')}>Cancel</button>
              }
            </div>

        </form>

        </div>

        <div>
          {
            post?.comments?.map(comment => (
              <Comment key={comment.id} id={user.id} comment={comment} />              
              )
            )
          }
        </div>

      </div>
    
    </section>
  )
}

export default Comments