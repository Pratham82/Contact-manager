import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types'
import setAuthToken from '../../utils/setAuthToken'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Actions

  // Load Users
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const res = await axios.get('/api/auth')
    try {
      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Register Users
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post('/api/users', formData, config)
      dispatch({ type: REGISTER_SUCCESS, payload: res.data })
      loadUser()
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message })
    }
  }

  // Loin Users
  const login = () => console.log('Load user called')

  // Logout
  const logout = () => console.log('Load user called')

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}{' '}
    </AuthContext.Provider>
  )
}

export default AuthState
