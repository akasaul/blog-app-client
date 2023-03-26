import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getPost } from '../app/features/post/postSlice';
import AuthorInfo from '../components/AuthorInfo'
import Content from '../components/Content'
import { MdBookmark, MdOutlineAddReaction, MdOutlineBookmarkBorder, MdOutlineComment, MdOutlineDelete, MdOutlineEdit, MdOutlineMoreHoriz } from 'react-icons/md'
import Spinner from '../components/spinner/Spinner';
import Comments from '../components/Comments';
import DeleteModal from '../components/DeleteModal';
import { postReaction } from '../app/features/reaction/reactionSlice';
import useAuthStatus from '../hooks/useAuthStatus';
import LoginModal from '../components/LoginModal';
import { toggleFav } from '../app/features/favs/favSlice';
import { API_URL } from '../utils/API_URI';

function Details() {

  const {isLoggedIn} = useAuthStatus();

  // Getting url params
  const param = useParams();
  const dispatch = useDispatch();
  
  // Getting Post with its states 
  const {post, isLoading, isSuccess, isFailed} = useSelector(state => state.post);

  
  const {reaction, isLoading: reactionLoading, isSuccess: reactionSuccess} = useSelector(state => state.reaction);

  const { user } =  useSelector(state => state.auth);
  const navigate = useNavigate();

  // Setting modal states s
  const [showModal, setShowModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState();

  // reaction states
  const [hearts, setHearts] = useState(0);
  const [unicorn, setUnicorn] = useState(0);
  const [fire, setFire] = useState(0);
  const [count, setCount] = useState(0);

  // Favorite states 
  const [faved, setFaved] = useState(false);
  const [favCount, setFavCount] = useState();
  

  // giving reaction

  useEffect(() => {
    if(selectedReaction) {
      dispatch(postReaction({id: post?.id, type: selectedReaction}))
    }

  }, [selectedReaction]);

  // Changing reaction states 
  useEffect(() => {
    if(reaction && reactionSuccess) {
     
      switch(reaction.type) {
        case 'heart': 
          setHearts(prev => prev + 1);
          setFire(post?.reactions?.filter(reaction => reaction?.type === 'fire')?.length);

          setUnicorn(post?.reactions?.filter(reaction => reaction?.type === 'unicorn')?.length);

          setCount(post?.reactions?.length)

          break;

        case 'unicorn': 
          setUnicorn(prev => prev + 1);
          setHearts(post?.reactions?.filter(reaction => reaction?.type === 'heart')?.length);
          setFire(post?.reactions?.filter(reaction => reaction?.type === 'fire')?.length);
          setCount(post?.reactions?.length)

          break;
          
        case 'fire': 
          setFire(prev => prev + 1);
          setHearts(post?.reactions?.filter(reaction => reaction?.type === 'heart')?.length);
    
          setUnicorn(post?.reactions?.filter(reaction => reaction?.type === 'unicorn')?.length);

          setCount(post?.reactions?.length)

          break;
        }
    }
  }, [reactionSuccess])
  

  // setting reactiion states at the begining
  useEffect(() => {
    if(isSuccess && post) {
      setHearts(post?.reactions?.filter(reaction => reaction?.type === 'heart')?.length);

      setFire(post?.reactions?.filter(reaction => reaction?.type === 'fire')?.length);

      setUnicorn(post?.reactions?.filter(reaction => reaction?.type === 'unicorn')?.length);

      setCount(post?.reactions?.length);

      setFaved(post?.favorites?.find(fav => fav?.user?.id === user?.id) ? true : false);

      setFavCount(post?.favorites?.length);

    }

  }, [isSuccess])

  useEffect(() => {
    const id = parseInt(param.id);
    dispatch(getPost(id));
  }, []);

  if(isLoading) {
    return <Spinner />
  }

  const handleWarning = () => {
    setShowModal(true);
  };

  const handleReaction = (reaction) => {
    if(!isLoggedIn) {
      setShowLogInModal(true);
    }
    setSelectedReaction(reaction);
  }

  const handleAddToFavorites = async () => {

    if(!isLoggedIn) {
      setShowLogInModal(true);
      return;
    }

    await dispatch(toggleFav(post?.id))

    if(faved) {
      setFavCount(prev => prev - 1)
      setFaved(false)
    } 
    
    else {
      setFavCount(prev => prev + 1)
      setFaved(true)
    }
    
  }

  const date = new Date(post?.user?.createdAt).toDateString().split(' ');

  return (
      <section className='flex items-start max-w-[1300px] mt-3 gap-4 mx-auto'>
        {
          showModal &&
            <DeleteModal header={post?.header} setShowModal={setShowModal} id={post?.id} />
        }

        {
          showLogInModal &&
            <LoginModal message={'Login To Give Reaction'} setShowModal={setShowLogInModal} />
        }

        <div className='min-w-[100px] pb-4 border fixed md:sticky md:top-0 bottom-0 bg-white md:flex-col flex gap-5 items-center  justify-around md:justify-start left-0 right-0 md:bg-accent md:pt-14 p-2 border-t z-[99]
        md:border-none'>

          <div className='flex add-reaction flex-col items-center relative'>
            <button><MdOutlineAddReaction size={24} className="hover:text-blue-500"/> </button>
            <p className='text-sm text-gray-700 hidden sm:block'>{
            count}</p>
          
            <div className='absolute bg-white left-[30px] md:bottom-[100px] top-[-50px] md:top-0 h-[60px] w-[170px] px-4 justify-between flex items-center p-2 border gap-5 z-50 rounded-lg reactions'>
            
              <button onClick={() => handleReaction('heart')} className="text-[20px] flex flex-col items-center hover:scale-110">
                💖
                <span className='text-sm'>{hearts}</span>
              </button>

              <button onClick={() => handleReaction('unicorn')} className="text-[20px] flex flex-col items-center hover:scale-110">
                  ⭐
                <span className='text-sm'>
                {unicorn}
                </span>
              </button>

              <button onClick={() => handleReaction('fire')} className="text-[20px] flex flex-col items-center hover:scale-110">
                  🔥
                <span className='text-sm'>
                {fire}
                </span>
              </button>

            </div>
          
          </div>

          <span className='flex flex-col items-center'>
            <button><MdOutlineComment size={24} className="hover:text-yellow-500"/> </button>
            <p className='text-sm text-gray-700 hidden sm:block'>{post?.comments?.length}</p>
          </span>

            <span className='flex flex-col items-center'>
                <button onClick={handleAddToFavorites}>
                  {
                    faved ? 
                    <MdBookmark  size={24} className="text-blue-500"/> :
                    <MdOutlineBookmarkBorder size={24} className="hover:text-blue-500"/> 
                  }
                </button>
                    
              <p className='text-sm text-gray-700 hidden sm:block'>{
                favCount}</p>
            </span>

          {
            user?.id === post?.user?.id &&
            <>
              <button onClick={handleWarning}><MdOutlineDelete size={28} className="hover:text-red-500 self-start"/></button>

              <Link to={`/edit?header=${post?.header}&&user=${post?.user?.id}&&content=${post?.content?.replaceAll('#', '@')}&&tags=${post?.tags}&&imageUrl=${post?.imageUrl}&&id=${post?.id}`}><MdOutlineEdit size={28} className="hover:text-violet-500 self-start"/></Link>
            </>
          }

          <span className='flex flex-col items-center'>
            <button><MdOutlineMoreHoriz size={24} className="hover:text-blue-500"/> </button>
          </span>


        </div>

        <div className='bg-white flex-1 max-w-[800px] border flex flex-col'>
          {
            post?.imageUrl &&
            <div className='h-[250px]'>
              <img className='h-full w-full rounded-t-lg object-cover object-top' src={`${API_URL}/${post?.imageUrl}`}  alt="" />
            </div>
          }
          
          <div className='p-6 flex gap-5 flex-col'>
            <div className='max-w-[90%] mx-auto w-full'>
              <AuthorInfo user={post?.user} postedAt={post?.createdAt} />
              <Content post={post} />
            </div>
          </div>

          <Comments post={post}  /> 

        </div>

      {/* Profile Component */}
      <div className='hidden flex-col gap-3 min-w-[250px] max-w-[350px] lg:flex '>

        <div className='bg-white flex flex-col gap-4  p-4 border rounded-lg '>
        
          <div className='flex items-end gap-2 mt-2'>
              {
                post?.user?.profileImg ? 
                <img className='h-[40px] w-[40px] object-cover rounded-full' src={`${API_URL}/${post?.user?.profileImg}`} alt="" /> : 
                  <span className='bg-gradient-to-r grid place-content-center font-bold border w-[40px] h-[40px]
                  rounded-full from-slate-300 to-green-500'>{post?.user?.name?.slice(0, 1)}</span>
            }
            <h2 className='text-md font-bold'>{post?.user?.name}</h2>
          </div>
      
          <Link to={`/profile/${post?.user?.id}`} className='bg-[#313CB9] w-full text-center p-2 text-white rounded-lg'>Go to Profile</Link>

        <p className='text-gray-600'>
            {post?.user?.bio}
        </p>

        <div className='text-gray-600'>
          <p className='font-[600]'>Joined</p>
          <span>{date[1] + ' ' + date[2] + ', ' + date[3]}</span>
        </div>

        </div>

        { 
          post?.user?.posts?.length > 0 &&
          
          <div className="bg-white border rounded-lg p-4">
              <h2 className='text-md font-bold mb-5'>More from 
              <span className='text-textHover mx-2'>{post?.user?.name}</span></h2>

            <div className='flex flex-col gap-5'>

              {
                post?.user?.posts?.map((curPost, index) => (
                  index < 4 && curPost?.id !== post?.id &&

                  <section key={index + Date.now()} className=' flex flex-col text-gray-600'>
                  
                    <a href={`/posts/${curPost?.id}`} className='mb-1 hover:text-textHover'>{curPost?.header}</a>
                  
                    <div className='flex gap-2 '>
                      <span>
                        {
                          curPost?.tags?.split(',')?.map(tag => 
                            <p key={tag + Date.now()} className='p-1 px-3 text-sm'>#{tag} 
                            </p>  
                          )
                        }
                      </span>
                    </div>
                  </section>

                ))
              }

            </div>
            
          </div>

        }


      </div>
        
      </section>
  )
}

export default Details