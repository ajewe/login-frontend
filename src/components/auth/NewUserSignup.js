import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createUser, useAuthState, useAuthDispatch } from '../../Context'

export const NewUserSignup = () => {
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  const history = useHistory();
  const [ newUser, setNewUser ] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: ''
  })

  const handleChange = e => {
    setNewUser({
      ...newUser,
      [ e.target.name ]: e.target.value,
    });
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) return alert('Passwords need to match');    
    let payload = {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName
    };
    try {
      //add new user
      let response = await createUser(dispatch, payload);
      if (!response.success) return;
      alert('User created!')
      history.push("/login");
    } catch (error) {
      console.log(error)
      alert('Unable to create user!', errorMessage)
    }
  }

  return (
    <div className="new-user-signup-div">
      <h1>Sign Up</h1>
      <form onSubmit={ handleSubmit }>
        <input 
          name="firstName" 
          placeholder="First Name"
          className="signup-input"
          value={ newUser.firstName }
          onChange={ e => handleChange(e) }
        />
        <br />
        <input 
          name="lastName" 
          placeholder="Last Name"
          className="signup-input"
          value={ newUser.lastName }
          onChange={ e => handleChange(e) }
        />
        <br />
        <input 
          name="email" 
          placeholder="Email"
          className="signup-input"
          value={ newUser.email }
          onChange={ e => handleChange(e) }
        />
        <br />
        <input 
          name="username" 
          placeholder="Username"
          className="signup-input"
          value={ newUser.username }
          onChange={ e => handleChange(e) }
          required
        />
        <br />
        <input 
          name="password" 
          type="password"
          placeholder="Password"
          className="signup-input"
          value={ newUser.password }
          onChange={ e => handleChange(e) }
          required
        />
        <br />
        <input 
          name="confirmPassword" 
          type="password"
          placeholder="Confirm Password"
          className="signup-input"
          value={ newUser.confirmPassword }
          onChange={ e => handleChange(e) }
          required
        />
        <button className="signup-submit" disabled={ loading }>
          Submit
        </button>
      </form>
      <p>Already have an account? <Link to={'/login'}>Login</Link></p>
    </div>
  )
}