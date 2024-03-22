import React from 'react'
import '../css/AddStudent.css'
import { useState } from 'react'
import axios from 'axios'

const AddStudent = () => {
    const [name, setName] = useState('')
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()  //used to prevent default sunmission.
        axios.post('http://localhost:3001/student/register', {name, username, password})
        .then(res => {
            console.log(res)   //res = response
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="student-form-container">
        <form action="" className="student-form" onSubmit={handleSubmit}>
            <h2>Add Student</h2>  <br/>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="username">username:</label>
                <input type="username" id = "username" placeholder='Enter username'
                onChange={(e) => setusername(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className='btn-login' >Register</button>
        </form>
    </div>
  )
}

export default AddStudent