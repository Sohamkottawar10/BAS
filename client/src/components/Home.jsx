// Desc: Home page component
import React, { useEffect } from 'react'
import '../css/Home.css'


const Home = () => {
  
  return (
    <div className="hero">
        <div className="hero-content">
            <h1 className="hero-text">Book Shop</h1>
            <p className="hero-description">
                Welcome to the Book Shop. We have a wide range of books for you to choose from.
                You can browse through our collection of books and purchase the ones you like.
            </p>
        </div>
        <div className="hero-image"></div>
    </div>

  )
}

export default Home