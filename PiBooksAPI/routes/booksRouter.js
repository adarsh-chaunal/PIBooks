const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const bookRouter = express.Router();

bookRouter.get('/', async (req, res) => {
    try{
        const books = await Book.find();
        return res.status(200).json(books);
    }
    catch(error){
        // console.error('Error fetching books:', error);
        return res.status(500).json({error: error.message});
    }
});

bookRouter.get('/:id', async (req, res) => {
    try{
        // Validate ObjectId format
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error: 'Invalid book ID format'});
        }

        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({error: 'Book not found'});
        }
        return res.status(200).json(book);
    }
    catch(error){
        console.error('Error fetching book:', error);
        return res.status(500).json({error: error.message});
    }
});

bookRouter.post('/', async (req, res) => {
    const {title, author, genre, publishedYear, isAvailable} = req.body;

    // Input validation
    if(!title || !author || !publishedYear){
        return res.status(400).json({error: 'Title, author, and publishedYear are required'});
    }

    if(typeof publishedYear !== 'number' || publishedYear < 1000 || publishedYear > new Date().getFullYear() + 1){
        return res.status(400).json({error: 'Published year must be a valid number'});
    }

    try{
        const existingBook = await Book.findOne(
            {title, author}
            // book => book.title === title && book.author === author
        )
        
        if(existingBook){
            return res.status(409).json({error: 'Book already exists'});
        }
        
        // Save the book to the database
        const book = await Book.create({title, 
            author, 
            genre, 
            publishedYear,
            isAvailable
        });

        return res.status(201).json(book);
    }
    catch(error){
        console.error('Error creating book:', error);
        return res.status(400).json({error: error.message});
    }
});

bookRouter.put('/:id', async (req, res) =>{
    try{
        // Validate ObjectId format
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error: 'Invalid book ID format'});
        }

        const {title, author, genre, publishedYear, isAvailable} = req.body;
        
        const bookUpdate = await Book.findByIdAndUpdate(
            req.params.id,
            {title, author, genre, publishedYear, isAvailable},
            {new: true, runValidators: true}
        );

        if(!bookUpdate){
            return res.status(404).json({error: 'Book not found'});
        }

        res.status(200).json(bookUpdate);
    }
    catch(error){
        console.error('Error updating book:', error);
        return res.status(400).json({error: error.message});
    }
});

bookRouter.delete('/:id', async (req, res) =>{
    try{
        // Validate ObjectId format
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error: 'Invalid book ID format'});
        }

        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if(!deletedBook){
            return res.status(404).json({error: 'Book not found'});
        }
        return res.status(200).json({message: 'Book deleted successfully'});
    }
    catch(error){
        console.error('Error deleting book:', error);
        return res.status(500).json({error: error.message});
    }   
});




module.exports = bookRouter;``