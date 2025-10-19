require('dotenv').config();

const connectDB = require('./config/dbconfig');

const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/booksRouter');

// Express instance
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/books', bookRouter);

// Start the server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} 🚀`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
