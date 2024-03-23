import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import BookCard from './BookCard'

const Books = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {                             //fetching data from the server
    axios.get('http://localhost:3001/book/books')
    .then(res => {
      setBooks(res.data)
      console.log(res.data)
    }).catch(err => console.log("error in accessing books "+err))
  }, [])
  return (
    <div className="book-list">
      {
        books.map(book => {
          return <BookCard book={book} key={book._id} ></BookCard>
        })
      }
    </div>
  )
}

export default Books