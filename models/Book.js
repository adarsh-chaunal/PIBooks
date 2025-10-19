const mongoose = require('mongoose');

// Book schema
const bookSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Book Title is required.']},
    author: {type: String, required: [true, 'Author Name is required.']},
    genre: String,
    publishedYear: {type: Number, required: [true, 'Published Year is required and must be a number.']},
    isAvailable: {type: Boolean, default: true}

}, {timestamps: true});

// Compile the schema into model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;



