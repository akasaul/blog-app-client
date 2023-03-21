import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Post from './Post'
import { getPosts } from '../app/features/post/postSlice';
import Spinner from './spinner/Spinner';
import LoginModal from './LoginModal';

function Main() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const {posts, isLoading, isFailed, isSuccess} =  useSelector(state => state.post)
  const [showModal, setShowModal] = useState(false);

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex-1'>
      {
        showModal &&
        <LoginModal setShowModal={setShowModal} />
      }


      {/* Filter  */}
      <ul className='flex gap-2 pl-5 font-semiBold text-gray-500'>
        <li className='hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 grid place-content-center'>
          <Link to={'/relevant'}>Relevant</Link>
        </li>
        <li className='hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 grid place-content-center'>
          <Link to={'/latest'}>Latest</Link>
        </li>
        <li className='hover:bg-white h-[40px] hover:text-textHover font-bold rounded-md px-2 grid place-content-center'>
          <Link to={'/latest'}>Top</Link>
        </li>
      </ul>

      {/* Posts */}
     
      <div>
        {
          isSuccess && posts &&
          posts?.map(post => (
            // <Post key={post?.id} time={post?.content?.split(' ')?.length / 60} setShowModal={setShowModal} id={post?.id} avatar={post?.user?.profileImg} username={post?.user?.username} comments={post?.comments} tags={post?.tags} header={post?.header}  post={post} />
            <Post key={post?.id} setShowModal={setShowModal}  post={post} />

          ))
        }
      </div>

    </div>
  )
}

export default Main