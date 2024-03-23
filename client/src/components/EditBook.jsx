import React, { useEffect } from 'react'
import '../css/AddStudent.css'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'

const EditBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()

    const {id} = useParams()  //useParams is used to get the parameters from the URL(here id)

    useEffect(() => {
        axios.get('http://localhost:3001/book/book/'+id)
        .then(res => {
            console.log(res)   //res = response
            setName(res.data.name)
            setAuthor(res.data.author)
            setImageUrl(res.data.imageUrl)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()  //used to prevent default sunmission.
        axios.put('http://localhost:3001/book/book/'+id, {name, author, imageUrl})       //put is used to update the data.
        .then(res => {
            console.log(res)   //res = response
            if(res.data.updated){
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
            <h2>Edit Book</h2>  <br/>
            <div className="form-group">
                <label htmlFor="book">Book Name:</label>
                <input type="text" id="book" placeholder='Enter book' name="book" value={name}          //this is added to show the previous values in the form.
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="author">Author Name:</label>
                <input type="author" id = "author" placeholder='Enter author' name="author" value={author}
                onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image URL:</label>
                <input type="text" id="image" placeholder='Enter image URL' name="image" value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}/>
            </div>
            <button type="submit" className='btn-login' >Update</button>
        </form>
    </div>
  )
}

export default EditBook