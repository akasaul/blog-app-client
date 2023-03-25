import Input from "../components/Input"
import { MdLogin } from 'react-icons/md';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../app/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isFailed, errors } = useSelector(state => state.auth);

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

    useEffect(() => {
        if(isSuccess && !isLoading) {
            toast.success('Successully Logged in');
            navigate('/');
        }

        if(isFailed) {
            errors instanceof Array ?
            errors.map(error => {
                toast.error(error);
            }) : 
            toast.error(errors);
        }

    }, [isLoading, isSuccess, isFailed, errors]);
    
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

            <p className="flex items-center gap-3">
                Not Joined as yet? 
                <Link to={'/signup'} className='text-md
                p-1 px-2 hover:bg-textHover rounded hover:text-white text-textHover'>Signup</Link>
            </p>
        </form>



    </section>
  )
}

export default Login