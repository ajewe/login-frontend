import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context'

export const ExistingUserLogin = () => {
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { loading, errorMessage } = useAuthState();
  const [ userLogin, setUserLogin ] = useState({
    username: '',
    password: ''
  });
  const handleChange = e => {
    setUserLogin({
      ...userLogin,
      [ e.target.name ]: e.target.value
    })
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let payload = userLogin;
    try {
      let response = await loginUser(dispatch, payload)
      if (!response.username) return;
      history.push('/')
    } catch (error) {
      console.log(error)
      alert('Invalid login', errorMessage)
    }
  }

  return (
    <div className="new-user-signup-div">
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input 
          name="username" 
          placeholder="Username"
          className="signup-input"
          value={ userLogin.username }
          onChange={ e => handleChange(e) }
          required
        />
        <br />
        <input 
          name="password" 
          type="password"
          placeholder="Password"
          className="signup-input"
          value={ userLogin.password }
          onChange={ e => handleChange(e) }
          required
        />
        <button className="signup-submit" disabled={ loading }>
          Submit
        </button>
      </form>
      <p>Need to create an account? <Link to={'/signup'}>Sign Up</Link></p>
    </div>
  )
}