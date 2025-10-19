// AWS Lambda handler for the Book API
// This file wraps the Express app to work with AWS Lambda

const serverless = require('serverless-http');
const app = require('../PiBooksAPI/server');

// Create the serverless handler
const handler = serverless(app, {
  binary: ['image/*', 'application/pdf']
});

// Export the handler for AWS Lambda
module.exports.handler = handler;

// For local testing
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
