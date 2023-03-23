import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from '../components/spinner/Spinner';

// Works for Users who are not logged In
const AntiPrivateRoute = () => {
    const {isLoggedIn, checkingStatus} = useAuthStatus();

    if(checkingStatus) {
        return <Spinner />
    }

    return !isLoggedIn ? <Outlet /> : <Navigate to='/' />
}

export default AntiPrivateRoute