require('dotenv').config();

const connectDB = require('./config/dbconfig');

const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/booksRouter');

// Express instance
const app = express();
const PORT = process.env.PORT || 3000;
const isRunningInLambda = Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/books', bookRouter);

// Ensure DB connection on startup/cold start
(async () => {
    try {
        await connectDB();
        if (!isRunningInLambda) {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT} 🚀`);
            });
        }
    } catch (error) {
        console.error('Failed to initialize server:', error);
        if (!isRunningInLambda) {
            process.exit(1);
        }
    }
})();

// Export app for AWS Lambda (serverless-http)
module.exports = app;
