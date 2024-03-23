import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const DeleteBook = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect (() =>{
        axios.delete('http://localhost:3001/book/book/'+id)         //I am able to use axios.delete because I have defined it in the server side(in routes).
        .then(res => {
            if(res.data.deleted){
                navigate('/books')
            }
        })
        .catch(err => console.log(err))
    }, [])
  
}

export default DeleteBook