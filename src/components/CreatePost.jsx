import React, { useEffect, useRef, useState } from 'react'
import { FaHeading } from 'react-icons/fa'
import { MdClose, MdCode, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdLink, MdList, MdOutlineInsertPageBreak, MdPhotoCamera, MdSettingsApplications } from 'react-icons/md'
import { setInputPos, setInputSelection } from '../utils/cursorPos';
import { mapTools} from '../utils/tools';
import { tags } from '../utils/tags';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../app/features/post/postSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { reset } from '../app/features/post/postSlice';

function CreatePost() {
  // States
  const [content, setContent] = useState('');
  const [currentTool, setCurrentTool] = useState('');
  const [tagList, setTagList] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [header, setHeader] = useState('');
  const [image, setImage] = useState();

  // Same tool selected twice 
  const [again, setAgain] = useState(false);

  // Redux states and dispatcher
  const dispatch = useDispatch();
  const {post, isFailed, isSuccess, errors} = useSelector(state => state.post)


  // React router dom
  const navigate = useNavigate();

  // Ref for input fields
  const textRef = useRef();
  const tagRef = useRef();

  // Reset All states 
  useEffect(() => {
    dispatch(reset());
  }, [])

  // Mapping the selected tool with the markdown code
  useEffect(() => {
    setContent(prev => prev + mapTools(currentTool));
  }, [currentTool, again])

  // Set Cursor position
  useEffect(() => {

    switch(currentTool) {
      case 'bold': 
        setInputPos(textRef.current, textRef.current.selectionStart - 2);
        return;

      case 'italic': 
        setInputPos(textRef.current, textRef.current.selectionStart - 1);
        return;

      case 'link': 
        setInputPos(textRef.current, textRef.current.selectionStart - 4);
        return
        
      case 'list': 
        setInputPos(textRef.current, textRef.current.selectionStart);
        return;

      case 'break': 
        setInputPos(textRef.current, textRef.current.selectionStart);
        return;

      case 'code': 
        setInputPos(textRef.current, textRef.current.selectionStart - 5);
        return;

    }
  }, [currentTool, again]);

  // State of error and success
  useEffect(() => {

    if(isFailed) {
        if(errors instanceof Array) {
            errors.map(msg => toast.error(msg));
        }
        toast.error(errors, {
            style: {
                minWidth: '200px',
                width: '80%', 
            }
        });
    }

    if(isSuccess && post) {
        toast.success('Successfully Posted', {
            style: {
                minWidth: '200px',
                width: '80%', 
            }
        });

        navigate('/');
    }

}, [isFailed, isSuccess, post])  


  // Setting Tool 
  const handleSetTool = (e) => {
    // if the same tool selected twice
    if(e.currentTarget.name === currentTool) {
      setAgain(again => !again);
      return;
    }
    setCurrentTool(e.currentTarget.name);
  }

  // Adding the selected tag to cur state
  const handleSetTags = (tag) => {
    setShowResults(false);
    if(selectedTags.includes(tag)) {
      toast.error('a hashtag can only be used once');
      return;
    }
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
        toast.error('a hashtag can only be used once');
        return;
      }
      setSelectedTags([...selectedTags, tagRef.current.value])
      tagRef.current.value = '';
    }
  }
  
  // On Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('header', header);
    formData.append('tags', selectedTags?.join(','));
    formData.append('content', content);
    formData.append('imageUrl', image);

    dispatch(createPost(formData));
  }


  return (
    <div className='mx-5'>
      <form className='bg-white mt-5 flex flex-col gap-2 rounded-lg max-w-[600px] mx-auto' onSubmit={handleSubmit}>

        <section className='border'>

            <div className='p-5 flex flex-col gap-2'>

              <h1 className='text-md font-bold '>Cover Image</h1>
              <label htmlFor="upload-image" className='hover:bg-accent rounded-full p-2 self-start'>
                  <MdPhotoCamera size={28} />
              </label>
              <input id="upload-image" type="file" className='hidden' name="coverImg" onChange={e => setImage(e.target.files[0])}/>
              
              <img className='max-h-[200px] w-full object-cover object-top' src={image && URL.createObjectURL(image)} alt="" />
             
              <input type="text" name="title" value={header} onChange={e => setHeader(e.target.value)} placeholder='New post title here...' className='p-2 text-[24px] outline-none font-bold' />

              <div className='flex flex-wrap gap-1'>
                {
                  selectedTags.length > 0 &&
                    selectedTags.map(tag => 
                      <button key={tag} type='button' className='text-gray-600 flex item-center gap-1 p-1 px-2 rounded-lg hover:bg-textPrimary hover:text-white border'>#{tag.length > 8 ? tag.slice(0, 8) + '...' : tag}

                      <MdClose className='hover:scale-110' onClick={() => setSelectedTags(selectedTags.filter(currentTag => currentTag !== tag))} />
                      </button>
                    )
                }
                
                <div className='relative'>
                  {
                    selectedTags.length < 4 &&
                    <input enterkeyhint="done" type="text" ref={tagRef} onKeyPress={handleTagSubmit} onFocus={() => setShowResults(true)} className='outline-none p-1' placeholder='search tags' onChange={handleChange} />
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

            </div>
          

            <div className='flex py-3 bg-accent px-4 sm:gap-1 gap-3'>
              
              <button onClick={handleSetTool} name="bold" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 sm:w-[40px] sm:h-[40px] h-[25px] w-[25px]'>
                <MdFormatBold  size={32}/>
              </button>

              <button onClick={handleSetTool} name="italic" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 sm:w-[40px] sm:h-[40px] h-[25px] w-[25px]'>
                <MdFormatItalic  size={32}/>
              </button>

              <button onClick={handleSetTool} name="link" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 sm:w-[40px] sm:h-[40px] h-[25px] w-[25px]'>
                <MdLink  size={32}/>
              </button>

              <button onClick={handleSetTool} name="list" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 sm:w-[40px] sm:h-[40px] h-[25px] w-[25px]'>
                <MdList  size={32}/>  
              </button>
              

              <button onClick={handleSetTool} name="break" type="button" className='hover:bg-textHover hover:text-white grid place-content-center rounded-lg p-1 sm:w-[40px] sm:h-[40px] h-[25px] w-[25px]'>
                <MdOutlineInsertPageBreak size={22} />
              </button>

              <button onClick={handleSetTool} name="code" type="button" className='hover:bg-textHover hover:text-white grid place-content-center rounded-lg p-1 sm:w-[40px] sm:h-[40px] h-[25px] w-[25px]'>
                <MdCode size={22} />
              </button>

            </div>

            <textarea ref={textRef} name="" id="" onChange={e => setContent(e.target.value)} cols="20" value={content} className='outline-none text-md p-4 w-full' rows="8" placeholder='Write your post content here...'>
            </textarea>

        </section>

        <div className='my-3 flex justify-between'>
          <button className='bg-[#4F46E5] h-10 w-24 rounded-md text-white'>
            Publish
          </button>

          <button type='button' onClick={() => navigate('/')} className='text-[#4F46E5] border-[#4F46E5] border h-10 w-24 rounded-md bg-white'>
            Cancel
          </button>

        </div>

      </form>
    </div>
  )
}

export default CreatePost