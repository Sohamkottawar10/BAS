import React , { useEffect }from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Logout = ({SetRole}) => {
    const navigate = useNavigate()
    useEffect (() =>{
        axios.get('http://localhost:3001/auth/logout')
        .then(res => {
            if(res.data.logout){
                SetRole('')
                navigate('/')
            }
        })
        .catch(err => console.log(err))
    }, [])
}

export default Logout