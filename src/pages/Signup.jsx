import Input from "../components/Input"
import { MdLogin, MdPhotoCamera } from 'react-icons/md';
import { useEffect, useState } from "react";
import { FaGithub } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../app/features/auth/authSlice";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Signup() {

    const {user, isLoading, isFailed, isSuccess, errors: errorMessage} = useSelector(state => state.auth);
    console.log(user);

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
            toast.success('Successfully signed up', {
                style: {
                    minWidth: '200px',
                    width: '80%', 
                }
            });
            navigate('/signup/add-details')
        }

    }, [isFailed, isSuccess])

    // All the form states 
    const [formData, setFormData] = useState({
        name: 'niko2121', 
        email: '21sav@gmail.com', 
        password: 'password', 
        password2: 'password',
        profileImg: '',
        username: 'niko2121',
    })

    // All Error states 
    const [errors, setErrors] = useState({
        name: '', 
        email: '', 
        password: '',
        password2: '',
        username: ''
    });

    // Destructured form states 
    const {name, email, password, password2, profileImg, username} = formData;

    // Destructured error states 
    const {name: nameErr, email: emailErr, password: passwordErr, password2: password2Err, username: usernameErr} = errors;

    // checking if any error exist 
    const isError = nameErr !== '' || emailErr !== '' || passwordErr !== '' || password2Err !== '' || usernameErr !== '';
    
    const dispatch = useDispatch();
    // const user = useSelector(state => state.user.user);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append('name', name);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('confirmPassword', password2);
        formData.append('profileImg', profileImg);

        dispatch(signUp(formData));
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
            [e.target.name]: e.target.files[0]
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

             // Additional validation for username  

             else if(e.target.name === 'username') {
              
                if(username.length < 5) {
                    setErrors({
                        ...errors, 
                        username: 'Username should be more than 5 characters'
                    });
                } else {
                    setErrors({
                        ...errors, 
                        username: ''
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

    const handleAuth = async (provider) => {
        window.location.href = `http://localhost:5000/auth/${provider}`;
        // const newWindow = window.open(
        //     authURI, 
        //     '_blank', 
        //     'width=500,height=500'
        // )
    }
 

  return (
    <section className="mt-4">
       
         <form className="flex flex-col mx-auto  max-w-[700px] bg-primary p-5 border rounded-md gap-4 justify-center" 
        onSubmit={handleSubmit} encType='multipart/form-data'>  

        <h1 className="font-bold">Welcome to DEV Community</h1>
        <p className="text-gray-600">DEV Community is a community of 1,022,645 amazing developers</p>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        
            <Input styles='p-1 border rounded-sm focus:outline-none' name="username" label={`Username ${username === '' ? '*' : ''}`} type='text' placeholder={'NJK47'} value={username} onChange={handleChange} onBlur={onBlur} err={usernameErr}  />

            <Input styles='p-1 border rounded-sm focus:outline-none' name="name" label={`Name ${name === '' ? '*' : ''}`} type='text' placeholder={'John'} value={name} onChange={handleChange} onBlur={onBlur} err={nameErr}  />
            
            <Input styles='p-1 border rounded-sm focus:outline-none' name="email" label={`Email ${email === '' ? '*' : ''}`} type='email' placeholder={'niko@gmail.com'} value={email} onChange={handleChange} onBlur={onBlur} err={emailErr} />
            
            <Input styles='p-1 border rounded-sm focus:outline-none' name="password" label={`Password ${password === '' ? '*' : ''}`} type='password' placeholder={'12345678'} value={password} onChange={handleChange} onBlur={onBlur} err={passwordErr} />
           
            <Input styles='p-1 border rounded-sm focus:outline-none' name="password2" label={`Confirm Password ${password2 === '' ? '*' : ''}`} type='password' placeholder={'12345678'} value={password2} onChange={handleChange} onBlur={onBlur} err={password2Err} />
          
            <div className="flex items-center hover:text-black text-gray-600">
                <label for="upload-image" className='hover:bg-accent rounded-full p-2 cursor-pointer'>
                    <MdPhotoCamera size={28} />
                </label>

                <p className="text-md font-bold">Add Image</p>
            </div>

            <input type="file" id="upload-image" className="hidden" onChange={handleFile} name="profileImg" />
            
        </div>

        {
            profileImg !== '' &&
            <div>
                <img src={URL.createObjectURL(profileImg)} className="max-h-[300px] w-[200px] object-cover object-center rounded-[2rem]" alt="" />
            </div>
        }

        <button className='border rounded-md text-textHover hover:bg-textHover hover:text-primary hover:underline border-textHover flex items-center p-2 gap-2 justify-center cursor-pointer' disabled={isError} type="submit">Signup <MdLogin /></button>

        
        </form>
       
        <div className="grid grid-cols-1 max-w-[700px] mx-auto gap-5 sm:grid-cols-2">
            
            <button onClick={() => handleAuth('google')} className="flex hover:scale-105 transition-all duration-150 border items-center gap-3 justify-center shadow-md p-2">
                Signin With Google
                <img src="/google.jpg" className="max-h-[32px]" alt="" />
            </button>

            <button onClick={() => handleAuth('github')} className="flex hover:scale-105 transition-all duration-150 rounded-md hover:bg-black gap-3 hover:text-white text-black border items-center justify-center shadow-md p-2">
                Signin With Github 
                <FaGithub size={24} />
            </button> 
        
        </div>

    </section>
  )
}

export default Signup