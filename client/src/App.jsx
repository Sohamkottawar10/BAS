import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Books from './components/Books'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import { useState, useEffect } from 'react'
import Logout from './components/Logout'
import AddBook from './components/AddBook'
import axios from 'axios'
import EditBook from './components/EditBook'
import DeleteBook from './components/DeleteBook'
import SignUp from './components/SignUp'
import SalesReceipt from './components/SalesReceipt'

function App() {
  const [role, SetRole] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {       
    axios.get('http://localhost:3001/auth/verify')  //this is a get request to the server to verify the user
    .then(res => {
      if(res.data.login){
        SetRole(res.data.role)
      } else {
        SetRole('')
      }
      console.log(res)
    }).catch(err => console.log(err))
  }, [])

  return (
    <BrowserRouter>
    <Navbar role = {role}/>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/books' element={<Books role = { role } />}></Route>
      <Route path='/login' element={<Login SetRole = {SetRole}/>}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/addstudent' element={<AddStudent />}></Route>
      <Route path='/logout' element={<Logout SetRole = {SetRole}/>}></Route>
      <Route path='/addbook' element={<AddBook />}></Route>
      <Route path='/book/:id' element={<EditBook />}></Route>
      <Route path='/delete/:id' element={<DeleteBook />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path="/salesReceipt/:id" element={<SalesReceipt />} />

    </Routes>

    </BrowserRouter>
  )
}

export default App
