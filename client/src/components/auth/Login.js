import React, { useState } from 'react'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    console.log('Login User', user)
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>{' '}
      </h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={onChange}
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
