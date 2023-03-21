import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function useAuthStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingStatus, setCheckignStatus] = useState(true);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if(user) {  
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        setCheckignStatus(false);
    }, [user])

    return {isLoggedIn, checkingStatus};
}

export default useAuthStatus