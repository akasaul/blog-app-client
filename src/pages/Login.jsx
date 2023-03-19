import Input from "../components/Input"
import { MdLogin, MdSend } from 'react-icons/md';
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../app/features/auth/authSlice";

function Login() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '', 
        password: '', 
    })

    const {username, password} = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(logIn(formData));
    }

    const handleChange  = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }
    
  return (
    <section className="mt-4">
        <form className="flex flex-col mx-auto  max-w-[500px] bg-primary p-5 border rounded-md gap-4 justify-center" 
        onSubmit={handleSubmit}>  

        <h1 className="font-bold">Welcome to DEV Community</h1>
        <p className="text-gray-600">DEV Community is a community of 1,022,645 amazing developers</p>
        
            <Input styles='p-1 border rounded-sm' name="username" onChange={handleChange} label={'username'} type='username' placeholder={'username'} value={username} />
            
            <Input styles='p-1 border rounded-sm' name="password" onChange={handleChange} label={'Password'} type='password' placeholder={'Password'} value={password} />
           
            <button className='border rounded-md text-textHover hover:bg-textHover hover:text-primary hover:underline border-textHover flex items-center p-2 gap-2 
            justify-center' type="submit">Login <MdLogin /></button>

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

export default Login