import Input from "../components/Input"
import { Link } from 'react-router-dom'
import { MdLogin, MdSend } from 'react-icons/md';
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { LOGIN } from '../graphql/queries'
import axios from 'axios';

function Login() {
    
    const [login, {data, error, loading}] = useLazyQuery(LOGIN);

    useEffect(() => {

        if(data && !loading) {
            localStorage.setItem('user', JSON.stringify(data.login));
            window.location.href = '/';
            toast.success('Signed In successfully')
        }


        if(error) {
            console.log(error.data)
            toast.error('An Error Ocurred');
        }

    }, [data, error, loading])


    const [formData, setFormData] = useState({
        email: '', 
        password: '', 
    })

    const {email, password} = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        login({
            variables: {
                email, 
                password
            }
        })
    }

    const handleChange  = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const handleClick = async () => {
        window.open('http://localhost:5000/auth/google');

        const user = await fetch('http://localhost:5000/auth/google', {
                method: 'GET', 
                credentials: 'include', 
                headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Credentials': true
                }
            });
            
        console.log(user);

    }
    
  return (
    <section className="mt-4">
        <form className="flex flex-col mx-auto  max-w-[500px] bg-primary p-5 border rounded-md gap-4 justify-center" 
        onSubmit={handleSubmit}>  

        <h1 className="font-bold">Welcome to DEV Community</h1>
        <p className="text-gray-600">DEV Community is a community of 1,022,645 amazing developers</p>
        
            <Input styles='p-1 border rounded-sm' name="email" onChange={handleChange} label={'Email'} type='email' placeholder={'Email'} value={email} />
            
            <Input styles='p-1 border rounded-sm' name="password" onChange={handleChange} label={'Password'} type='password' placeholder={'Password'} value={password} />
           
            <button className='border rounded-md text-textHover hover:bg-textHover hover:text-primary hover:underline border-textHover flex items-center p-2 gap-2 
            justify-center' type="submit">Login <MdLogin /></button>

            <button onClick={handleClick} className="flex hover:text-textHover border items-end justify-center p-2">
                Sign In With Google
                <img src='/google.jpg' className="h-8" alt="" />
            </button>

        </form>

    </section>
  )
}

export default Login