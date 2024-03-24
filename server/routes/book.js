import express from 'express'
import { Book } from '../models/Book.js';
import { verifyAdmin } from './auth.js'

const router = express.Router();

//Add New book
router.post('/add', verifyAdmin, async(req, res) => {
    try{
        const {name, author, imageUrl, noOfCopies, rackNumber, price, copiesSold, threshold, isbnNumber, publisher, addressOfPublisher} = req.body;    //destructuring the entered values.

        const newBook = new Book({
            name: name,
            author: author,
            imageUrl: imageUrl,
            noOfCopies: noOfCopies,
            rackNumber: rackNumber,
            price: price,
            copiesSold: copiesSold,
            threshold: threshold,
            isbnNumber: isbnNumber,
            publisher: publisher,
            addressOfPublisher: addressOfPublisher,
        })
        await newBook.save()
        return res.json({added: true})

    } catch(err) {
        return res.json({message: "Error in adding book"})
    }
})

router.get('/books', async (req, res) => {
    try{
        const books = await Book.find() //return all the books
        return res.json(books)
    } catch(err) {
        console.log(err)
        return res.json({message: "Error in fetching books"})
    }
})

router.get('/book/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findById(req.params.id)
        console.log(book)
        return res.json(book)
        
    } catch(err) {
        console.log(err)
        return res.json({message: "Error in fetching book"})
    }
})

router.put('/book/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate({_id: id}, req.body)
        console.log(book)
        return res.json({updated:true, book})
        
    } catch(err) {
        console.log(err)
        return res.json({message: "Error in fetching book"})
    }
})

router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({_id: id})
        return res.json({deleted: true, book})
    } catch(err) {
        console.log(err)
        return res.json({message: "Error in deleting book"})
    }
})

router.salesReceipt = async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findById(req.params.id)
        console.log(book)
        return res.json(book)
        
    } catch(err) {
        console.log(err)
        return res.json({message: "Error in fetching book"})
    }
}

export {router as bookRouter}