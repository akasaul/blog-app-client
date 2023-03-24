import React, { useState } from 'react'
import { MdBookmark, MdCake, MdExpandLess, MdExpandMore, MdOutlineComment, MdPostAdd, MdTag } from 'react-icons/md'
import { API_URL } from '../utils/API_URI';
import Post from './Post';
import Spinner from './spinner/Spinner';


function UserDetails({user, self, isLoading}) {

  const date = new Date(user?.createdAt).toDateString().split(' ');

  const [showAllPosts, setShowAllPosts] = useState(false);

  const [showAllFavs, setShowAllFavs] = useState(false);


  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col gap-5'>
      <section className='p-3 bg-white border relative rounded-lg flex flex-col md:items-center'>

        {
          user?.profileImg  ? 
          <img className='h-[60px] w-[60px] z-30 md:h-[100px] object-cover md:w-[100px] -mt-10 top-[-20px] rounded-full' src={`${API_URL}/${user?.profileImg}`} alt="" /> : 
          <div  className="hover:shadow-md grid 
          h-[60px] w-[60px] z-30 md:h-[100px] object-cover md:w-[100px] -mt-10 top-[-20px] rounded-full md:text-lg font-bold
          place-content-center bg-blue-400 px-2 py-2 sm:h-[40px] sm:w-[40px] ">{user?.username.slice(0, 1)}</div>
          
        }

        { 
          self &&
          <div className='mt-5 flex w-full'>
            <a href={`/signup/add-details`} className='p-2 px-5 rounded-lg ml-auto items-end
          bg-textHover text-white'>Edit Profile</a>
          </div>    

        }
      
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-bold'>{user?.name}</h2>
          <h2 className='text-sm text-gray-600'>@ {user?.username}</h2>
          <p className='md:text-[18px]'>{user?.bio}</p>
        </div>

        <div className='flex text-sm md:text-[15px] text-gray-600 gap-2 items-center my-5'>
          <MdCake size={22} />
          Joined on 
          {` ${date[1]} ${date[2]} ${date[3]}`}
        </div>

      </section>


      <section className='p-3 py-5 md:w-[35%] relative flex flex-col  gap-3 md:items-center bg-white border md:self-start rounded-lg'>

        <p className='flex items-center text-gray-600  w-full text-[16px] gap-3'> <MdPostAdd size={24} /> {user?.posts?.length > 0 ? user?.posts?.length : '0' } posts published</p>

        <p className='flex items-center text-gray-600  w-full text-[16px] gap-3'> <MdOutlineComment size={20} /> {user?.comments?.length > 0 ? user?.comments?.length : '0' } comments published</p>

        <p className='flex items-center text-gray-600  w-full text-[16px] gap-3'> <MdBookmark size={24} /> {user?.favorites?.length} posts Bookmarked</p>

      </section>


      {
        user?.posts?.length > 0 &&
        <section className='bg-white p-3 border rounded-lg'>
          <h1 className='font-bold'>Posts</h1>
          {
            user?.posts?.map((post, index) => {
                if(showAllPosts) {
                  return <Post post={post} profile={true}/>
                }
                if(!showAllPosts) {
                  if(index < 4) {
                    return <Post post={post} profile={true}/> 
                  }
                }
              }
            )
          }

          {
            ! showAllPosts && user?.posts?.length > 4 ? 
              <button onClick={() => setShowAllPosts(true)} className='border-textHover hover:bg-textHover hover:text-white border p-2 text-textHover rounded-lg my-3 flex items-end gap-3'>Show All 
              <MdExpandMore /> </button> : 
              user?.posts?.length > 4 &&
              <button onClick={() => setShowAllPosts(false)} className='border-textHover hover:bg-textHover hover:text-white border p-2 text-textHover rounded-lg my-3 flex items-end gap-3'>Show Less
              <MdExpandLess />
              </button> 
          }
        </section>
      }

      {
        self && user?.favorites?.length > 0 &&
          <section className='bg-white p-3 border rounded-lg'>
            <h1 className='font-bold'>Favorite Posts</h1>
            {
            user?.favorites?.map((post, index) => {
                if(showAllFavs) {
                  return <Post post={post?.post} profile={true}/>
                }
                if(!showAllFavs) {
                  if(index < 4) {
                    return <Post post={post?.post} profile={true}/> 
                  }
                }
              }
            )
          }

        {
            ! showAllFavs && user?.favorites?.length > 4 ? 
              <button onClick={() => setShowAllFavs(true)} className='border-textHover hover:bg-textHover hover:text-white border p-2 text-textHover rounded-lg my-3 flex items-end gap-3'>Show All 
              <MdExpandMore /> </button> : 
              user?.favorites?.length > 4 &&
              <button onClick={() => setShowAllFavs(false)} className='border-textHover hover:bg-textHover hover:text-white border p-2 text-textHover rounded-lg my-3 flex items-end gap-3'>Show Less
              <MdExpandLess />
              </button> 
          }
          </section>
      }
    </div>
  )
}

export default UserDetails