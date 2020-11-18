import React, { useReducer } from 'react';

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).username
  : "";

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";

export const initialState = {
  userDetails: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null
};

export const AuthReducer = ( initialState, action) =>  {
  switch( action.type ) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "REQUEST_SIGNUP":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return { 
        ...initialState, 
        userDetails: action.payload.username,
        token: action.payload.token, 
        loading: false
      };
    case "SIGNUP_SUCCESS":
      return {
        ...initialState,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        userDetails: "",
        token: ""
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
    case "SIGNUP_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};