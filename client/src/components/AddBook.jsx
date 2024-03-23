import React from 'react'
import '../css/AddStudent.css'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()  //used to prevent default sunmission.
        axios.post('http://localhost:3001/book/add', {name, author, imageUrl})
        .then(res => {
            console.log(res)   //res = response
            if(res.data.added){
                navigate('/books')
            } else {
                console.log(res)
            }
        })
        .catch(err => console.log(err))
        // console.log('Book Added')
    }

  return (
    <div className="student-form-container">
        <form action="" className="student-form" onSubmit={handleSubmit}>
            <h2>Add Book</h2>  <br/>
            <div className="form-group">
                <label htmlFor="book">Book Name:</label>
                <input type="text" id="book" placeholder='Enter book'
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="author">Author Name:</label>
                <input type="author" id = "author" placeholder='Enter author'
                onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image URL:</label>
                <input type="text" id="image" placeholder='Enter image URL'
                onChange={(e) => setImageUrl(e.target.value)}/>
            </div>
            <button type="submit" className='btn-login' >Add</button>
        </form>
    </div>
  )
}

export default AddBook