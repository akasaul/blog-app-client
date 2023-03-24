import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Post from './Post'
import { getPosts } from '../app/features/post/postSlice';
import Spinner from './spinner/Spinner';
import LoginModal from './LoginModal';

function Main() {

  const dispatch = useDispatch();
  const [category, setCategory] = useState('relevant');

  useEffect(() => {
    dispatch(getPosts(category));
  }, [category]);

  const {posts, isLoading, isFailed, isSuccess} =  useSelector(state => state.post)
  const [showModal, setShowModal] = useState(false);

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex-1'>
      {
        showModal &&
        <LoginModal message={'Login to Like this Post'} setShowModal={setShowModal} />
      }


      {/* Filter  */}
      <ul className='flex gap-2 pl-5 font-semiBold text-gray-500'>
        <li>
          <button className={`hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 ${category === 'relevant' && 'bg-white text-textHover' }`} onClick={() => setCategory('relevant')}>Relevant</button>
        </li>

        <li>
        <button className={`hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 ${category === 'top' && 'bg-white text-textHover' }`} onClick={() => setCategory('top')}>Top</button>
        </li>
        
        <li>
        <button className={`hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 ${category === 'latest' && 'bg-white text-textHover' }`} onClick={() => setCategory('latest')}>Latest</button>
        </li>

      </ul>

      {/* Posts */}
     
      <div>
        {
          isSuccess && posts &&
          posts?.map(post => (
            <Post key={post?.id} setShowModal={setShowModal}  post={post} />

          ))
        }
      </div>

    </div>

  )
}

export default Main