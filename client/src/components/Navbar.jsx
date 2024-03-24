import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'  //../ means one directory up. The two dots .. in the import statement are used to navigate up one level in the directory structure.

const Navbar = ({role}) => {
  return (
    <nav className='navbar'>
        <div className="navbar-left">
            <Link to="/" className='navbar-brand'>Book Store</Link>
        </div>
        <div className="navbar-right">
            <Link to="/books" className='navbar-link'>Books</Link>
            {/* add signup also */}
            {role === "admin" && <>
              <Link to="/dashboard" className='navbar-link'>Dashboard</Link>
              <Link to="/addbook" className='navbar-link'>Add Book</Link>
              <Link to="/addstudent" className='navbar-link'>Add Customer</Link>
            </>}

            {role === ""?
            <Link to="/login" className='navbar-link'>Login</Link>
            : <Link to="/logout" className='navbar-link'>Logout</Link>
            }

            {role === "" && <>
            <Link to="/signup" className='navbar-link'>Signup</Link>
            </>}
            
            
        </div>
    </nav>
  )
}

export default Navbar