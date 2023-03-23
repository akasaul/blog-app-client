import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '../components/Menu'
import { getMe } from '../app/features/user/userSlice'
import Spinner from '../components/spinner/Spinner'
import { MdCake, MdComment, MdOutlineComment, MdPodcasts, MdPostAdd, MdTag } from 'react-icons/md'
import Post from '../components/Post';

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isFailed, isSuccess } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getMe());
  }, []);


  if(isLoading) {
    return <Spinner />
  }

  const date = new Date(user?.createdAt).toDateString().split(' ');

  return (
    <div className='max-w-[1000px] flex flex-col gap-5 mt-7 mx-auto'>

        <section className='p-3 bg-white border relative rounded-lg flex flex-col md:items-center'>

          {
            user?.profileImg  ? 
            <img className='h-[60px] w-[60px] z-30 md:h-[100px] object-cover md:w-[100px] -mt-10 top-[-20px] rounded-full' src={`http://localhost:5000/${user?.profileImg}`} alt="" /> : 
            <div  className="hover:shadow-md grid 
            h-[60px] w-[60px] z-30 md:h-[100px] object-cover md:w-[100px] -mt-10 top-[-20px] rounded-full md:text-lg font-bold
            place-content-center bg-blue-400 px-2 py-2 sm:h-[40px] sm:w-[40px] ">{user?.username.slice(0, 1)}</div>
            
          }


          <div className='mt-5 flex w-full'>
            <button className='p-2 px-5 rounded-lg ml-auto items-end
           bg-textHover text-white'>Edit Profile</button>
          </div>    
        
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

          <p className='flex items-center text-gray-600  w-full text-[16px] gap-3'> <MdTag size={24} /> 0 tags published</p>

        </section>


        {
          user?.posts?.length > 0 &&
          <section className='bg-white p-3 border rounded-lg'>
            <h1 className='font-bold'>Posts</h1>
            {
              user?.posts?.map(post => (
                <Post post={post} profile={true}/>
              ))
            }
          </section>
        }

      
    
    </div>
  )
}

export default Profile