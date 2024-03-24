import React from 'react'
import '../css/BookCard.css'
import {Link} from 'react-router-dom'

const BookCard = ({book, role}) => {
    const {name, author, imageUrl, noOfCopies, price} = book
  return (
    <div className='book-card'>
        <img src={imageUrl} alt={name} className='book-image'/>
        <div className="book-details">
          
            <h3>{name}</h3>                                                 {/* Design the card : ............................THARUN................................................. */}
            <p>{author}</p>             
            <p>Copies : {noOfCopies}</p>
            <p>{price}Rs</p>

        </div>
        {role === "admin" &&    //only admin can see the edit and delete button
        <div className="book-actions">
        <button><Link to={`/book/${book._id}`} className='btn-link'>Edit</Link></button>
        <button><Link to={`/delete/${book._id}`} className='btn-link'>Delete</Link></button>
        <button><Link to={`/salesReceipt/${book._id}`} className='btn-link'>Sales Reciept</Link></button>
      </div>
        }

        {role === "" &&
        <div className="book-actions">
          <button><Link to={`/book/${book._id}`} className='btn-link'>Purchase</Link></button>
        </div>
        }
        
    </div>
  )
}

export default BookCard