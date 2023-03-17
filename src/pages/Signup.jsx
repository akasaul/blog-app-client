import Input from "../components/Input"
import { Link } from 'react-router-dom'
import { MdLogin, MdSend } from 'react-icons/md';
import { useState } from "react";
import { FaGithub, FaGoogle } from 'react-icons/fa'

function Signup() {

    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        password: '', 
        password2: '',
        profilePic: ''
    })

    const [errors, setErrors] = useState({
        name: '', 
        email: '', 
        password: '',
        password2: ''
    });

    const {name, email, password, password2, profilePic} = formData;

    const {name: nameErr, email: emailErr, password: passwordErr, password2: password2Err} = errors;

    const isError = nameErr !== '' || emailErr !== '' || passwordErr !== '' || password2Err !== '';

    console.log(isError);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handleChange  = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }


    const onBlur = (e) => {
        // check length 
        if(e.target.value.length < 1) {
            setErrors({
                ...errors, 
                [e.target.name]: 'This field is required'
            })

        } else {

            // Additional validation for name 

            if(e.target.name === 'name') {
              
                if(name.length < 5) {
                    setErrors({
                        ...errors, 
                        name: 'Name should be more than 5 characters'
                    });
                } else {
                    setErrors({
                        ...errors, 
                        name: ''
                    });
                }
            }

            // Additional valiadtion for password 
            else if(e.target.name === 'password') { 
              
                if(password.length < 5) {
                    setErrors({
                        ...errors, 
                        password: 'Password should be more than 5 characters'
                    });
                } else {
                    setErrors({
                        ...errors, 
                        password: ''
                    });
                }
            }

            // Passwords do not match 

            else if(e.target.name === 'password2') {
              
                if(password !== password2) {
                    setErrors({
                        ...errors, 
                        password2: 'Passwords do not match'
                    });
                } else {
                    setErrors({
                        ...errors, 
                        password2: ''
                    });
                }
            }


            // else remove error 
            else {
                setErrors({
                    ...errors, 
                    [e.target.name]: '',
                })
            }
        }
    }


  return (
    <section className="mt-4">
       
         <form className="flex flex-col mx-auto  max-w-[700px] bg-primary p-5 border rounded-md gap-4 justify-center" 
        onSubmit={handleSubmit}>  

        <h1 className="font-bold">Welcome to DEV Community</h1>
        <p className="text-gray-600">DEV Community is a community of 1,022,645 amazing developers</p>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        
            <Input styles='p-1 border rounded-sm focus:outline-none' name="name" label={'Name'} type='text' placeholder={'Name'} value={name} onChange={handleChange} onBlur={onBlur} err={nameErr}  />
            
            <Input styles='p-1 border rounded-sm focus:outline-none' name="email" label={'Email'} type='email' placeholder={'Email'} value={email} onChange={handleChange} onBlur={onBlur} err={emailErr} />
            
            <Input styles='p-1 border rounded-sm focus:outline-none' name="password" label={'Password'} type='password' placeholder={'Password'} value={password} onChange={handleChange} onBlur={onBlur} err={passwordErr} />
           
            <Input styles='p-1 border rounded-sm focus:outline-none' name="password2" label={'Confirm Password'} type='password' placeholder={'Password'} value={password2} onChange={handleChange} onBlur={onBlur} err={password2Err} />
           
            <Input styles='p-1 border rounded-sm focus:outline-none' name="file" label={'Profile Picture'} type='file' placeholder={'Password'} onChange={handleChange} />
           

        </div>

            <button className='border rounded-md text-textHover hover:bg-textHover hover:text-primary hover:underline border-textHover flex items-center p-2 gap-2 justify-center cursor-pointer' disabled={isError} type="submit">Signup <MdLogin /></button>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              
                <Link to='/auth/google' className="flex hover:scale-105 transition-all duration-150 border items-center gap-3 justify-center shadow-md p-2">
                    Signin With Google
                    <img src="/google.jpg" className="max-h-[32px]" alt="" />
                </Link>

                <Link to='/auth/google' className="flex hover:scale-105 transition-all duration-150 rounded-md hover:bg-black gap-3 hover:text-white text-black border items-center justify-center shadow-md p-2">
                    Signin With Github 
                    <FaGithub size={24} />
                </Link> 
           
            </div>
        
        </form>

    </section>
  )
}

export default Signup