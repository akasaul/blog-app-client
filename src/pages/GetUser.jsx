import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserDetails from '../components/UserDetails'
import { getUser } from '../app/features/user/userSlice';
import { useParams } from 'react-router-dom';

function GetUser() {
  const dispatch = useDispatch();
  const {user, isLoading, isSuccess, isFailed, errors} = useSelector(state => state.user);
  const params = useParams();

  useEffect(() => {
      dispatch(getUser(params.id))
  }, []);

  return (
    <div className='max-w-[1000px] flex flex-col gap-5 mt-7 mx-auto'>
      <UserDetails user={user} isLoading={isLoading} isFailed={isFailed} self={false}  />
    </div>
  )
}

export default GetUser