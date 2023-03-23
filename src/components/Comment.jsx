import React from 'react'
import { MdClose, MdDelete, MdOutlineFavoriteBorder} from 'react-icons/md';
import {BsDot } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../app/features/comment/commentSlice';

function Comment({comment, id}) {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(comment?.id));
  }
  
  return (
    <div className='flex gap-4'>

    {
          comment?.user?.profileImg ?
          <img className='h-[30px] w-[30px] object-contain rounded-full' src={`http://localhost:5000/${comment?.user?.profileImg}`} alt="" /> : 
          <span className='bg-gradient-to-r grid place-content-center font-bold border w-[30px] h-[30px]
          rounded-full from-slate-300 to-green-500'>{comment?.user?.username?.slice(0, 1)}</span>
        }

      <div className='w-full relative'>
        <div className="border rounded-lg p-3 bg-white">

          <div className='flex items-center'>
            <p>{comment.user.name}</p>
            <BsDot />
            <p className='text-xs p-0'>Mar 20</p>
          </div>
          <p>
            {comment?.content}
          </p>

          {
            id === comment?.user?.id && 
            <button onClick={handleDelete} className='absolute top-[10px] right-[10px] h-[20px] w-[20px] grid place-content-center hover:bg-textHover rounded-full hover:text-white'>
              <MdDelete />
            </button>
          }

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