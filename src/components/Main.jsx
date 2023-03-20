import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Post from './Post'
import { getPosts } from '../app/features/post/postSlice';
import Spinner from './spinner/Spinner';

function Main() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const {posts, isLoading, isFailed, isSuccess} =  useSelector(state => state.post)

  // useEffect(() => {
  // }, [isLoading, isFailed]);

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex-1'>
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
          isSuccess &&
          posts?.map(post => (
            <Post key={post?.id} id={post?.id} username={post?.user?.username} tags={post?.tags} header={post?.header}  />
          ))
        }
      </div>

    </div>
  )
}

export default Main