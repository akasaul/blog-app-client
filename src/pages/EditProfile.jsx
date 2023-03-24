import Input from "../components/Input"
import { MdClose, MdEdit, MdPhotoCamera } from 'react-icons/md';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import {tags} from '../utils/tags';

import { useNavigate, useSearchParams } from "react-router-dom";
import { editUser } from "../app/features/user/userSlice";
import { API_URL } from "../utils/API_URI";

function EditProfile() {

    const {user, isLoading, isFailed, isSuccess, errors: errorMessage} = useSelector(state => state.user);

    const [params] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(isFailed) {
            if(errorMessage instanceof Array) {
                errorMessage.map(msg => toast.error(msg));
            }
            toast.error(errorMessage, {
                style: {
                    minWidth: '200px',
                    width: '80%', 
                }
            });
        }

        if(isSuccess) {
          
            toast.success('Successfully Edited', {
                style: {
                    minWidth: '200px',
                    width: '80%', 
                }
            });
            navigate('/profile')
        }

    }, [isFailed, isSuccess])

    
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagList, setTagList] = useState(tags)

    const [showResults, setShowResults] = useState(false);
  
    // All the form states 
    const [formData, setFormData] = useState({
      name: '', 
      username: '', 
      profileImg: '',
      bio: ''
    })


    const tagRef = useRef();


    useEffect(() => {


      setFormData({
        name: params.get('name'),
        username: params.get('username'),
        bio: params.get('bio'),
      })
    }, []);


    // Destructured form states 
    const {name, profileImg, username, bio} = formData;

    const dispatch = useDispatch();    

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
          formData.append('name', name);
          formData.append('username', username);
          formData.append('profileImg', profileImg) 
          formData.append('bio', bio);
          formData.append('favTags', selectedTags.join(','));
        
        

        dispatch(editUser({formData, id: params.get('id')}))
    }

    const handleChange  = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const handleFile = (e) => {
        setFormData({
            ...formData, 
            profileImg: e.target.files[0]
        })

    }


  // Adding the selected tag to cur state
  const handleSetTags = (tag) => {
    setShowResults(false);
    setSelectedTags([...selectedTags, tag])
  }
 
  // filter tags
  const handleTagChange = (e) => {
    setTagList(
      tags.filter(tag => tag.includes(e.target.value))
    );
  }

  // Listed to enter key event
  const handleTagSubmit = (e) => {
    if(e.key == 'Enter') {
      e.preventDefault();
      if(selectedTags.includes(tagRef.current.value)) {
        toast.error('a hashtag can only be used once');
        return;
      }
      setSelectedTags([...selectedTags, tagRef.current.value])
      tagRef.current.value = '';
    }
  }


  return (
    <section className="mt-4">
       
         <form className="flex flex-col mx-auto  max-w-[700px] bg-primary p-5 border rounded-md gap-4 justify-center" 
        onSubmit={handleSubmit} encType='multipart/form-data'>  

        <h1 className="font-bold">Edit Your Profile</h1>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        
            <Input styles='p-1 border rounded-sm focus:outline-none' name="username" label={'Username'} type='text' placeholder={'NJK47'} value={username} onChange={handleChange}  />

            <Input styles='p-1 border rounded-sm focus:outline-none' name="name" label={'Name'} type='text' placeholder={'John'} value={name} onChange={handleChange}  />


            <Input styles='p-1 border rounded-sm focus:outline-none' name="bio" label={'Bio'} type='text' placeholder={'author @ niko dev'} value={bio} onChange={handleChange}  />

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
                    <input type="text" ref={tagRef} onKeyPress={handleTagSubmit} onFocus={() => setShowResults(true)} className='outline-none p-1' placeholder='search tags' onChange={handleTagChange} />
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

           
            <div className="flex items-center hover:text-black text-gray-600">
                <label htmlFor="upload-image" className='hover:bg-accent rounded-full p-2 cursor-pointer'>
                    <MdPhotoCamera size={28} />
                </label>

                <p className="text-md font-bold">Add Image</p>
            </div>

            <input type="file" id="upload-image" className="hidden" onChange={handleFile} name="profileImg" />
            
        </div>

        {
            profileImg ?
            <img className='max-h-[300px] w-[200px] object-cover object-center rounded-[2rem]' src={profileImg && URL.createObjectURL(profileImg)} alt="" /> : 
            params.get('profileImg') &&
            <img className='max-h-[300px] w-[200px] object-cover object-center rounded-[2rem]' src={`${API_URL}/${params.get('profileImg')}`} alt="" />                
        }

        <button className='border rounded-md text-textHover hover:bg-textHover hover:text-primary hover:underline border-textHover flex items-center p-2 gap-2 justify-center cursor-pointer' type="submit">Update <MdEdit /></button>
        
    </form>

    </section>
  )
}

export default EditProfile