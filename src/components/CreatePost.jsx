import React, { useEffect, useRef, useState } from 'react'
import { FaHeading } from 'react-icons/fa'
import { MdCancel, MdCode, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdLink, MdList, MdListAlt, MdOutlineBreakfastDining, MdOutlineInsertPageBreak, MdViewList } from 'react-icons/md'
import { setInputPos, setInputSelection } from '../utils/cursorPos';
import {tools, mapTools} from '../utils/tools';

function CreatePost() {
  
  const [content, setContent] = useState('');
  const [currentTool, setCurrentTool] = useState('');

  const textRef = useRef();

  useEffect(() => {
    setContent(prev => prev + mapTools(currentTool));
  }, [currentTool])

  useEffect(() => {
    switch(currentTool) {
      case 'bold': 
        setInputPos(textRef.current, content.length - 2);
        return;

      case 'italic': 
        setInputPos(textRef.current, content.length - 1);
        return;
      case 'link': 
        setInputSelection(textRef.current, content.length - 4, content.length - 1);

    }
  }, [content]);
  
  const handleSetTool = (e) => {
    setCurrentTool(e.currentTarget.name);
  }



  return (
    <div>
      <form className='bg-white flex flex-col gap-2 rounded-lg max-w-[600px] mx-auto'>

        <section className='border'>

            <div className='p-5 flex flex-col gap-2'>

              <input type="file" name="coverImg" />
              <input type="text" name="title" id="" placeholder='New post title here...' className='p-2 text-[24px] outline-none font-bold' />
            
              <select name="tags">
                <option name="tag">#javascript</option>
                <option name="tag">#python</option>
                <option name="tag">#php</option>
                <option name="tag">#whatever</option>
              </select>

            </div>
          

            <div className='flex py-3 bg-accent px-4 gap-1'>
              
              <button onClick={handleSetTool} name="bold" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 w-[40px] h-[40px]'>
                <MdFormatBold  size={32}/>
              </button>

              <button onClick={handleSetTool} name="italic" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 w-[40px] h-[40px]'>
                <MdFormatItalic  size={32}/>
              </button>

              <button onClick={handleSetTool} name="link" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 w-[40px] h-[40px]'>
                <MdLink  size={32}/>
              </button>

              <button onClick={handleSetTool} name="list" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 w-[40px] h-[40px]'>
                <MdList  size={32}/>  
              </button>

              <button onClick={handleSetTool} name="heading" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 w-[40px] h-[40px]'>
                <FaHeading size={21}/>  
              </button>
              

              <button onClick={handleSetTool} name="underline" type="button" className='hover:bg-textHover hover:text-accent grid place-content-center rounded-lg p-1 w-[40px] h-[40px]'>
                <MdFormatUnderlined size={28}/>  
              </button>

              <button onClick={handleSetTool} name="break" type="button" className='hover:bg-textHover hover:text-white grid place-content-center rounded-lg p-1 w-[40px] h-[40px]'>
                <MdOutlineInsertPageBreak size={22} />
              </button>

              <button onClick={handleSetTool} name="code" type="button" className='hover:bg-textHover hover:text-white grid place-content-center rounded-lg p-1 w-[40px] h-[40px]'>
                <MdCode size={22} />
              </button>

            </div>

            <textarea ref={textRef} name="" id="" onChange={e => setContent(e.target.value)} cols="40" value={content} className='outline-none text-md p-4' rows="8" placeholder='Write your post content here...'>
            </textarea>

        </section>

        <div className='my-3 flex justify-between'>
          <button className='bg-[#4F46E5] h-10 w-24 rounded-md text-white'>
            Publish
          </button>

          <button className='text-[#4F46E5] border-[#4F46E5] border h-10 w-24 rounded-md bg-white'>
            Cancel
          </button>

        </div>

      </form>
    </div>
  )
}

export default CreatePost