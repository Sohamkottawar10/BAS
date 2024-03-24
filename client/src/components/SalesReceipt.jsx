import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SalesReceipt = () => {
    const [book, setBook] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3001/book/book/'+id)
            .then(res => {
                setBook(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    // const handleSalesReceipt = () => {
    //     // Navigate to the sales receipt page when the button is clicked
    //     window.location.href = `/salesReceipt/${id}`;
    // };

    return (
        <div className="sales-receipt-container">
            <h2>Sales Receipt</h2>
            {book ? (                                        //to ckeck if book is not NULL, then only display the details.
                <div className="book-details">
                    <p><strong>Book Name:</strong> {book.name}</p>
                    <p><strong>Author Name:</strong> {book.author}</p>
                    <p><strong>ISBN Number : </strong>{book.isbnNumber}</p>
                    <p><strong>Price : </strong>{book.price}</p>
                    <p><strong>Number of Copies : </strong>{book.noOfCopies}</p>
                    <p><strong>Total Revenue : </strong>{book.copiesSold * book.price}</p>
                    <p><strong>Rack Number : </strong>{book.rackNumber}</p>
                    <p><strong>Copies Sold : </strong>{book.copiesSold}</p>
                    <p><strong>Threshold : </strong>{book.threshold}</p>
                    <p><strong>Publisher : </strong>{book.publisher}</p>
                    <p><strong>Address of Publisher : </strong>{book.addressOfPublisher}</p>
                    
                    {/* <p><strong>Image URL:</strong> {book.imageUrl}</p> */}
                    {/* Add more book attributes here */}
                    {/* Render the button or link here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SalesReceipt;
