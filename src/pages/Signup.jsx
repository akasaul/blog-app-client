import Input from "../components/Input"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { MdSend } from 'react-icons/md';
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from '../graphql/mutations';
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux";

function Signup() {

    const [signup, { data, loading, error }] = useMutation(SIGN_UP);

    useEffect(() => {

        if(data && !loading) {
            localStorage.setItem('user', JSON.stringify(data.signup));
            toast.success('Signed In successfully')
            window.location.href = '/';
        }


        if(error) {
            toast.error('An Error Ocurred');
        }

    }, [data, error, loading])

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        signup({
            variables: {
                name, 
                email, 
                password, 
                password2
            }
        });
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
        <form className="flex flex-col mx-auto  max-w-[500px] bg-primary p-5 border rounded-md gap-4 justify-center" 
        onSubmit={handleSubmit}>  

        {
            error &&
            <p>Error Occured</p>
        }
      
        <h1 className="font-bold">Welcome to DEV Community</h1>
        <p className="text-gray-600">DEV Community is a community of 1,022,645 amazing developers</p>
        
            <Input styles='p-1 border rounded-sm' name="name" label={'Name'} type='text' placeholder={'Name'} value={name} onChange={handleChange} onBlur={onBlur} err={nameErr}  />
            
            <Input styles='p-1 border rounded-sm' name="email" label={'Email'} type='email' placeholder={'Email'} value={email} onChange={handleChange} onBlur={onBlur} err={emailErr} />
            
            <Input styles='p-1 border rounded-sm' name="password" label={'Password'} type='password' placeholder={'Password'} value={password} onChange={handleChange} onBlur={onBlur} err={passwordErr} />
           
            <Input styles='p-1 border rounded-sm' name="password2" label={'Confirm Password'} type='password' placeholder={'Password'} value={password2} onChange={handleChange} onBlur={onBlur} err={password2Err} />
           
            <Input styles='p-1 border rounded-sm' name="file" label={'Profile Picture'} type='file' placeholder={'Password'} onChange={handleChange} />
           
            <button className='border rounded-md text-textHover hover:bg-textHover hover:text-primary hover:underline border-textHover flex items-center p-2 gap-2 
            justify-center' type="submit">Submit <MdSend /></button>
    
            <Link to='/auth/google' className="flex hover:text-textHover border items-end justify-center p-2">
                Sign In With Google
                <img src='/google.jpg' className="h-8" alt="" />
            </Link>
        
        </form>

    </section>
  )
}

export default Signup