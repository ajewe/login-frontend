export const createUser = async ( dispatch, signupPayload ) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupPayload)
  };

  try {
    dispatch({ type: 'REQUEST_SIGNUP'});
    let response = await fetch(`${ process.env.REACT_APP_API_URL }/users`, requestOptions);
    let data = await response.json();

    if (data.success) {
      dispatch({ type: 'SIGNUP_SUCCESS' });
      return data;
    }
    dispatch({ type: 'SIGNUP_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'SIGNUP_ERROR', error: error });
  }
}

export const loginUser = async ( dispatch, loginPayload ) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginPayload)
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ process.env.REACT_APP_API_URL }/session`, requestOptions);
    let data = await response.json();
    
    if (data.token) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    }
    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export const logout = async ( dispatch ) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

export const getUserData = async ( dispatch, userId, userToken ) => {
  const requestOptions = {
    headers: {
      // "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Method": "GET",
      // "Access-Control-Allow-Credentials": "true",
      token: userToken
    }
  }
  try {
    dispatch({ type: 'REQUEST_DATA' });
    console.log( 'yo', userId, userToken )
    let response = await fetch(`${ process.env.REACT_APP_API_URL }/users/${userId}`, requestOptions);
    let data = await response.json();
    console.log('data requested', data)

    if (data.username) {
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      return console.log('got data');
    }
    dispatch({ type: 'FETCH_ERROR' });
    return;
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR' });
  }
} 