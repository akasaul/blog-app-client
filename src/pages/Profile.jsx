import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '../components/Menu'
import { getMe } from '../app/features/user/userSlice'
import Spinner from '../components/spinner/Spinner'
import UserDetails from '../components/UserDetails';

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isFailed, isSuccess } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <div className='max-w-[1000px] flex flex-col gap-5 mt-7 mx-auto'>
      <UserDetails isLoading={isLoading} isFailed={isFailed} isSuccess={isSuccess} user={user} self={true} />      
    </div>
  )
}

export default Profile