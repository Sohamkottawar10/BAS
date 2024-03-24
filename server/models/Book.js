//Schema for the Book model
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    //can add date of publication, genre, etc.
    name: {type: String},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    noOfCopies: {type: Number, required: true},     //also used to see which book is available
    rackNumber: {type: String, required: true},
    price: {type: Number, required: true},
    copiesSold: {type: Number, required: true},
    threshold: {type: Number, required: true},      //threshold on the count of the books, if it falls below a certain no. then a query should be send to the admin.
    isbnNumber:{type: String, required : true},
    publisher: {type: String, required : true},
    addressOfPublisher: {type: String, required: true}

})

const bookModel = mongoose.model('Book', bookSchema)
export {bookModel as Book}


/*
1) Book count =0 , book not in the shop are different.
2) If book not present then => the query for the book is used to increment a request field for the book.
*/
