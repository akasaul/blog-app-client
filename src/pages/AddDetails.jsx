import { MdAddCircleOutline, MdLogin, MdClose, MdSkipNext, MdOutlineFavoriteBorder,  } from 'react-icons/md';
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tags } from '../utils/tags';
import { toast } from 'react-hot-toast'
import { addUserDetails } from '../app/features/user/userSlice';
import Spinner from '../components/spinner/Spinner';


function AddDetails() {
    const dispatch = useDispatch();

    const [selectedTags, setSelectedTags] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [bio, setBio] = useState();

    // User State 
    const {user, isLoading, isSuccess, isFailed, errors} = useSelector(state => state.user);

    const navigate = useNavigate();
    

    useEffect(() => {
      if(user && isSuccess) {
        toast.success('Thanks for Your Generousity');
        navigate('/');
      }

      if(isSuccess) {
        navigate('/');
      }

      if(isFailed && errors) {
          errors.map(error => 
            toast.error(error)
            )
      }


    }, [isSuccess, isLoading, user, isFailed, errors]);

    const [tagList, setTagList] = useState(tags);

    const tagRef = useRef();
    

  const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(addUserDetails({bio, favTags: tagList.join(',')}));
  }

  // Adding the selected tag to cur state
  const handleSetTags = (tag) => {
    setShowResults(false);
    setSelectedTags([...selectedTags, tag])
  }
  
    // filter tags
    const handleChange = (e) => {
      setTagList(
        tags.filter(tag => tag.includes(e.target.value))
      );
    }

      // Listed to enter key event
  const handleTagSubmit = (e) => {
    if(e.key == 'Enter') {
      e.preventDefault();
      if(selectedTags.includes(tagRef.current.value)) {
        toast.error('No same topics are allowed');
        return;
      }
      setSelectedTags([...selectedTags, tagRef.current.value])
      tagRef.current.value = '';
    }
  }
  

  if(isLoading) {
    return <Spinner />
  }


  return (
    <section className="mt-4">
     
        <form className="flex flex-col mx-auto  max-w-[500px] bg-primary p-5 border rounded-md gap-4 justify-center" 
        onSubmit={handleSubmit}>  

        <h1 className="font-bold">Welcome to DEV Community</h1>
        <p className="text-gray-600">Tell us More about Yourself</p>
        
            <div className="flex flex-col gap-2">
              <label  className="text-gray-500 hover:text-black text-sm hover:cursor-pointer flex items-center gap-3" htmlFor="bio">Bio <MdAddCircleOutline /></label>
              <textarea id="bio"  onChange={(e) => setBio(e.target.value)} value={bio} className="w-full border outline-none p-3"></textarea>
            </div>


            <label className="text-gray-500 hover:text-black text-sm hover:cursor-pointer flex items-center gap-3" htmlFor="bio">Interested In <MdOutlineFavoriteBorder /></label>

            <div className='flex gap-1'>
                {
                  selectedTags.length > 0 &&
                    selectedTags.map(tag => 
                      <button key={tag} type='button' className='text-gray-600 flex item-center gap-1 p-1 px-2 rounded-lg hover:bg-textPrimary hover:text-white border'>#{tag}

                      <MdClose className='hover:scale-110' onClick={() => setSelectedTags(selectedTags.filter(currentTag => currentTag !== tag))} />
                      </button>
                    )
                }
                
                <div className='relative'>
                  {
                    selectedTags.length < 4 &&
                    <input type="text" ref={tagRef} onKeyPress={handleTagSubmit} onFocus={() => setShowResults(true)} className='outline-none p-1' placeholder='search tags' onChange={handleChange} />
                  }

                  {
                    showResults &&
                      <ul className='absolute  bg-white
                      left-0 right-0'>
                        <div className='flex justify-end px-2' onClick={() => setShowResults(false)}>
                          
                          { tagList.length > 0 &&
                            <button onClick={() => setShowResults(false)}>
                              <MdClose />
                            </button>
                          }

                        </div>
                        {
                          tagList.map(tag =>
                            <li key={tag} onClick={() => handleSetTags(tag)} className='p-2 text-sm border-b cursor-pointer hover:bg-accent'>#{tag}</li>
                        )
                        }
                      </ul>

                  }
                </div>
              
              </div>
           

            <div className="flex  justify-between">
             
              <button className='border flex-[0.3] rounded-md text-textHover hover:bg-textHover hover:text-primary hover:underline border-textHover flex items-center p-2 gap-2 
              justify-center' type="submit">Continue <MdLogin /></button>

              <Link to={'/'} className='border flex-[0.3] rounded-md text-textHover hover:bg-textHover hover:text-primary hover:underline border-textHover flex items-center p-2 gap-2 
              justify-center' type="button">Not Now<MdSkipNext /></Link>

            </div>

        </form>

    </section>
  )
}

export default AddDetails