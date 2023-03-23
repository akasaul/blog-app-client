import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from '../components/spinner/Spinner';

const PrivateRoute = () => {
    const {isLoggedIn, checkingStatus} = useAuthStatus();

    if(checkingStatus) {
        return <Spinner />
    }

    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute