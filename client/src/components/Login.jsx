import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios'

const Login = ({SetRole}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  const handleSubmit =async () => {
    axios.post('http://localhost:3001/auth/login', {username, password, role})    //The second argument to axios.post is the data that you want to send to the server. In this case, it's an object containing username, password, and role.
    //.then(res => console.log(res))  :  this is a promise. The server's response is passed to the function as res, which is then logged to the console.
    .then(res => {
      console.log(res.data)
      if(res.data.login && res.data.role === 'admin') {
        SetRole('admin')
        navigate('/dashboard')
      } else if(res.data.login) {   // && res.data.role === 'student', if it is not admin then by default it is a student.
        SetRole('student')
        navigate(`/student/${username}`)
      }
    })                      
    .catch(err => console.log(err))
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2> <br/>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder='Enter Username'
          onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="username">Password:</label>
          <input type="password" placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select name="role" id="role"
          onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Customer</option>
          </select>
        </div>
        <button className='btn-login' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login