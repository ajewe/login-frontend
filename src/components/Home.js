import React, { useEffect } from 'react';
import { useAuthDispatch, getUserData, logout, useAuthState } from '../Context'

export const Home = props => {
  //read dispatch and user details from context
  const dispatch = useAuthDispatch();
  const user = useAuthState();
  const token = JSON.parse(localStorage.getItem("currentUser")).token
  //useEffect to get user details
  useEffect(() => {
    getUserData(dispatch, user.username, token);
  }, [])

  const handleLogout = () => {
    //call logout action
    logout(dispatch);
    props.history.push('/login');
  }

  return (
    <div className="home-div">
      <h1>Welcome { user.username }!</h1>
      <p>First Name: { user.userDetails.firstName }</p>
      <button onClick={ handleLogout } >Logout</button>
    </div>
  )
}