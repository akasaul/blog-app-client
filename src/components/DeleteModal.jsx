import React, { useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, reset } from '../app/features/post/postSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './spinner/Spinner';

function DeleteModal({setShowModal, header, id}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {post, isSuccess,isLoading, isDeleted} = useSelector(state => state.post);

  useEffect(() => {
    if(isDeleted) {
      navigate('/')
    }
  }, [isDeleted]);

  const handleDelete = () => {
    dispatch(deletePost(id));
  };

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='bg-gray-800 opacity-50 fixed top-0 bottom-0 z-[100] right-0 left-0
      '>
        </div>

        <div className='absolute z-[101] min-h-[500px] max-w-[700px]  mx-auto rounded-lg border p-5 bg-white opacity-100 top-[50px] left-[50px] right-[50px] bottom-[50px]'>
        
          <div>
            <button onClick={() => setShowModal(false)} className='hover:bg-textHover grid place-content-center hover:text-white rounded-full h-[30px] w-[30px]'>
              <MdClose size={25} />
            </button>
          </div>

          <div className='grid place-content-center'>
            <img src="/removed.png" className='sm:max-h-[200px] max-h-[100px] mx-auto' alt="sign up first" />
            <h2 className='text-center font-sans text-lg text-gray-700 font-bold'>Delete "{header?.slice(0, 10)}"..?</h2>
            
            <div className='grid place-content-center gap-2'>

              <div className='mt-5 flex flex-col items-center'>
                <button className='bg-red-500 hover:bg-red-700 text-white p-3 rounded-full hover:scale-110' onClick={handleDelete}>
                  <MdClose size={32} />                  
                </button>
                <p className='text-lg font-bold'>Yes</p>
              </div>
            
            </div>
          
          </div>

        </div>
    </>
  )
}

export default DeleteModal