import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../app/features/post/postSlice';
import AuthorInfo from '../components/AuthorInfo'
import Content from '../components/Content'
import { MdDelete, MdOutlineBookmarkBorder, MdOutlineComment, MdOutlineDelete, MdOutlineEdit, MdOutlineFavoriteBorder, MdOutlineMoreHoriz, MdReadMore } from 'react-icons/md'
import Spinner from '../components/spinner/Spinner';
import Comments from '../components/Comments';
import DeleteModal from '../components/DeleteModal';

function Details() {

  // Getting url params
  const param = useParams();
  const dispatch = useDispatch();
  
  // Getting Post with its states 
  const {post, isLoading, isSuccess, isFailed} = useSelector(state => state.post);

  const { user } =  useSelector(state => state.auth);

  // Setting modal states s
  const [showModal, setShowModal] = useState(false);

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

  return (
    <section className='flex items-start max-w-[1300px] mt-3 gap-4 mx-auto'>

      {
        showModal &&
          <DeleteModal header={post?.header} setShowModal={setShowModal} id={post?.id} />
      }

      <div className='min-w-[100px] fixed md:static bottom-0 bg-white md:flex-col flex gap-5 items-center  justify-around md:justify-start left-0 right-0 md:bg-accent md:pt-14 p-2 border-t
      md:border-none'>

        <span className='flex flex-col items-center'>
          <button><MdOutlineFavoriteBorder size={24} className="hover:text-red-500"/> </button>
          <p className='text-sm text-gray-700 hidden sm:block'>114</p>
        </span>

        <span className='flex flex-col items-center'>
          <button><MdOutlineComment size={24} className="hover:text-yellow-500"/> </button>
          <p className='text-sm text-gray-700 hidden sm:block'>60</p>
        </span>

        <span className='flex flex-col items-center'>
          <button><MdOutlineBookmarkBorder size={24} className="hover:text-blue-500"/> </button>
          <p className='text-sm text-gray-700 hidden sm:block'>5</p>
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

      <div className='bg-white max-w-[800px] border flex flex-col'>
        {
          post?.imageUrl &&
          <div className='h-[250px]'>
            <img className='h-full w-full rounded-t-lg object-cover object-top' src={`http://localhost:5000/${post?.imageUrl}`}  alt="" />
          </div>
        }
        
        <div className='p-6 flex gap-5 flex-col'>
          <div className='max-w-[90%] mx-auto'>
            <AuthorInfo user={post?.user} />
            <Content post={post} />
          </div>
        </div>

        <Comments post={post}  /> 

      </div>

    {/* Profile Component */}
    <div className='hidden flex-col flex-1 gap-3 min-w-[250px] max-w-[350px] lg:flex '>

      <div className='bg-white flex flex-col gap-4  p-4 border rounded-lg '>
      
        <div className='flex items-end gap-2 mt-2'>
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tommy-shelby-cillian-murphy-peaky-blinders-1569234705.jpg?crop=0.727xw:0.484xh;0.273xw,0.0232xh&resize=768:*" className='h-[50px] w-[50px] rounded-full' alt="" />
          <h2 className='text-md font-bold'>Tapjyoti Bose</h2>
        </div>
    
        <button className='bg-[#313CB9] w-full p-2 text-white rounded-lg'>Follow</button>

      <p className='text-gray-600'>
          Top Rated Freelancer || Blogger || Cross-Platform App Developer || Web Developer || Open Source Contributor
      </p>

      <div className='text-gray-600'>
        <p className='font-[600]'>Joined</p>
        <p>Dec 3, 2020</p>
      </div>

      </div>

      <div className="bg-white border rounded-lg p-4">
          <h2 className='text-md font-bold mb-5'>More from 
          <span className='text-textHover mx-2'>Tyapajyoti Bose</span></h2>

        <div className='flex flex-col gap-5'>

          <section className=' flex flex-col text-gray-600'>
            <Link to={'/id '} className='mb-1 hover:text-textHover'>7 Libraries You Should Know as a React Developer</Link>
            <div className='flex gap-2 '>
              <span>#javascript</span>
              <span>#react</span>
            </div>
          </section>

          <section className=' flex flex-col text-gray-600'>
            <Link to={'/id '} className='mb-1 hover:text-textHover'>7 Libraries You Should Know as a React Developer</Link>
            <div className='flex gap-2 '>
              <span>#javascript</span>
              <span>#react</span>
            </div>
          </section>

        </div>

        
      </div>

    </div>
      
    </section>
  )
}

export default Details