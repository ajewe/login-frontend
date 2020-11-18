import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../Context'

export const Home = props => {
  //reead dispatch and user details from context
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  const handleLogout = () => {
    //call logout action
    logout(dispatch);
    props.history.push('/login');
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome { user.userDetails }</p>
      <button onClick={ handleLogout } >Logout</button>
    </div>
  )
}