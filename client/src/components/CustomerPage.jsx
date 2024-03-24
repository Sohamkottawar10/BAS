import React from 'react'; // Import the React library
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CustomerPage = () => {
const { username } = useParams() // Get the username from the URL
const [customerData, setCustomerData] = useState(null)

useEffect(() => {
    axios.get(`http://localhost:3001/customer/${username}`)
    .then(res => {
        setCustomerData(res.data) // Set the customer data
    })
    .catch(err => console.log(err))
}, [username])

// Render the customer data
return (
    <div> {/* Add the missing import statement for the 'div' element */}
        {customerData && (
        <div>
          <h2>{customerData.name}</h2>
          // Render other customer data here
        </div>
      )}
    </div>
  )
}

export default CustomerPage