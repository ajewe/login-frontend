import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { useAuthState } from './Context'
import { Home } from './components/Home';
import { ExistingUserLogin } from './components/auth/ExistingUserLogin';
import { NewUserSignup } from './components/auth/NewUserSignup';

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  const user = useAuthState();

  return (
    <Route 
      { ...rest }
      render={ props => user.userDetails
        ? <Component { ...props } /> 
        : <Redirect to={{
            pathname: "/login",
            state: { from: location }
            }} /> 
      }
    />
  )
}

export const Router = () => {
  return (
    <Switch>
      <Route path='/login' component={ ExistingUserLogin } />
      <Route path='/signup' component={ NewUserSignup } />
      <ProtectedRoute exact path='/' component={ Home } />
    </Switch>
  )
}