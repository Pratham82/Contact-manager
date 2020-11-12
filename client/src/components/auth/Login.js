import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../contexts/auth/authContext'
import AlertContext from '../../contexts/alert/alertContext'

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user

  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === 'Invalid credentials') {
      setAlert(error, 'danger')
      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (email === '' || password === '') {
      setAlert('Please fill in all the fields', 'danger')
    } else {
      login({
        email,
        password,
      })
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>{' '}
      </h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  )
}
export default Login
