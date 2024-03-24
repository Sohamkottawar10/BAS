import React from 'react'
import '../css/AddStudent.css'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [imageUrl, setImageUrl] = useState(0)
    const [noOfCopies, setnoOfCopies] = useState('')
    const [rackNumber, setrackNumber] = useState('')
    const [price, setprice] = useState(0)
    const [copiesSold, setcopiesSold] = useState(0)
    const [threshold, setthreshold] = useState(0)
    const [isbnNumber, setisbnnumber] = useState('')
    const [publisher, setpublisher] = useState('')
    const [addressOfPublisher, setaddressOfPublisher] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()  //used to prevent default sunmission.
        axios.post('http://localhost:3001/book/add', {name, author, imageUrl, noOfCopies, rackNumber, price, copiesSold, threshold, isbnNumber, publisher, addressOfPublisher})
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
            <div className="form-group">
                <label htmlFor="image">Number of Copies:</label>
                <input type="text" id="noOfCopies" placeholder='Enter Number of Copies'
                onChange={(e) => setnoOfCopies(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Rack Number:</label>
                <input type="text" id="rackNumber" placeholder='Enter Rack Number'
                onChange={(e) => setrackNumber(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Price:</label>
                <input type="text" id="price" placeholder='Enter Price'
                onChange={(e) => setprice(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Copies Sold:</label>
                <input type="text" id="copiesSold" placeholder='Enter Copies Sold'
                onChange={(e) => setcopiesSold(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Threshold:</label>
                <input type="text" id="threshold" placeholder='Enter Threshold'
                onChange={(e) => setthreshold(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">ISBN Number:</label>
                <input type="text" id="image" placeholder='Enter ISBN Number'
                onChange={(e) => setisbnnumber(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Publisher:</label>
                <input type="text" id="publisher" placeholder='Enter Publisher'
                onChange={(e) => setpublisher(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Address of Publisher:</label>
                <input type="text" id="address" placeholder='Enter Address of Publisher'
                onChange={(e) => setaddressOfPublisher(e.target.value)}/>
            </div>
            <button type="submit" className='btn-login' >Add</button>
        </form>
    </div>
  )
}

export default AddBook