# AWS Deployment Guide for Book API

This guide will help you deploy your Book API project to AWS using various deployment strategies.

## 🏗️ Architecture Overview

Your Book API project consists of:
- **Frontend**: React application (PiBooksWebUI)
- **Backend**: Node.js/Express API (PiBooksAPI)
- **Database**: MongoDB (you'll need to set this up separately)

## 📋 Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Node.js** and **npm** installed
4. **MongoDB Atlas** account (for database)

## 🚀 Deployment Options

### Option 1: Simple S3 + Lambda Deployment (Recommended)

This is the easiest way to get started:

#### Step 1: Set up AWS CLI
```bash
aws configure
# Enter your AWS Access Key ID, Secret Access Key, and region
```

#### Step 2: Create S3 Bucket
```bash
aws s3 mb s3://your-book-api-bucket
```

#### Step 3: Deploy Frontend to S3
```bash
cd PiBooksWebUI
npm run build:prod
aws s3 sync build/ s3://your-book-api-bucket/frontend/ --delete
```

#### Step 4: Configure S3 for Static Website Hosting
```bash
aws s3 website s3://your-book-api-bucket/frontend/ --index-document index.html --error-document index.html
```

#### Step 5: Deploy Backend to Lambda
```bash
cd PiBooksAPI
npm install
zip -r ../backend-deployment.zip . -x "node_modules/.cache/*" "*.log"
aws lambda create-function \
  --function-name book-api-backend \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler server.handler \
  --zip-file fileb://../backend-deployment.zip
```

### Option 2: Serverless Framework Deployment

#### Step 1: Install Serverless Framework
```bash
npm install -g serverless
npm install serverless-offline --save-dev
```

#### Step 2: Configure Environment Variables
```bash
export MONGODB_URI="your-mongodb-connection-string"
```

#### Step 3: Deploy
```bash
cd deploy
serverless deploy --stage dev
```

### Option 3: Manual Deployment Script

Use the provided deployment script:

```bash
chmod +x deploy/aws-deploy.sh
./deploy/aws-deploy.sh
```

## 🔧 Configuration

### Environment Variables

#### Frontend (PiBooksWebUI/env.production)
```env
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com/prod/api/v1
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0
```

#### Backend (PiBooksAPI/env.production)
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your-mongodb-connection-string
CORS_ORIGIN=https://your-cloudfront-domain.cloudfront.net
```

### AWS Configuration (deploy/aws-config.json)
```json
{
  "aws": {
    "region": "us-east-1",
    "s3Bucket": "your-book-api-bucket",
    "cloudfrontDistributionId": "",
    "lambdaFunctionName": "book-api-backend"
  }
}
```

## 🗄️ Database Setup

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your environment variables

### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

## 🌐 Domain and SSL Setup

### Option 1: CloudFront Distribution
1. Create a CloudFront distribution
2. Set S3 bucket as origin
3. Configure custom domain (optional)
4. Update CORS settings in your backend

### Option 2: Custom Domain with Route 53
1. Register a domain in Route 53
2. Create hosted zone
3. Configure DNS records
4. Set up SSL certificate with ACM

## 📊 Monitoring and Logging

### CloudWatch Setup
```bash
# Create log group
aws logs create-log-group --log-group-name /aws/lambda/book-api-backend

# Set retention policy
aws logs put-retention-policy --log-group-name /aws/lambda/book-api-backend --retention-in-days 14
```

### Health Check Endpoint
Add this to your backend for monitoring:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit sensitive data to version control
2. **CORS Configuration**: Restrict CORS to your frontend domain
3. **API Keys**: Use AWS Secrets Manager for sensitive data
4. **HTTPS**: Always use HTTPS in production
5. **Access Control**: Implement proper IAM roles and policies

## 🚨 Troubleshooting

### Common Issues

#### Frontend Not Loading
- Check S3 bucket permissions
- Verify CloudFront distribution is deployed
- Check browser console for errors

#### API Not Responding
- Check Lambda function logs in CloudWatch
- Verify environment variables are set
- Check API Gateway configuration

#### Database Connection Issues
- Verify MongoDB connection string
- Check network security groups
- Ensure database user has proper permissions

### Debug Commands
```bash
# Check Lambda function status
aws lambda get-function --function-name book-api-backend

# View CloudWatch logs
aws logs describe-log-streams --log-group-name /aws/lambda/book-api-backend

# Test API endpoint
curl https://your-api-gateway-url.amazonaws.com/prod/api/v1/books
```

## 📈 Scaling Considerations

1. **Lambda Concurrency**: Set appropriate concurrency limits
2. **Database**: Consider MongoDB Atlas auto-scaling
3. **CDN**: Use CloudFront for global distribution
4. **Caching**: Implement Redis for session management

## 💰 Cost Optimization

1. **S3 Storage**: Use appropriate storage classes
2. **Lambda**: Optimize memory allocation
3. **CloudFront**: Use appropriate caching policies
4. **Database**: Monitor and optimize queries

## 🔄 CI/CD Pipeline

Consider setting up automated deployment with:
- GitHub Actions
- AWS CodePipeline
- Jenkins

## 📞 Support

If you encounter issues:
1. Check AWS CloudWatch logs
2. Review this documentation
3. Check AWS service status
4. Contact AWS support if needed

## 🎯 Next Steps

After successful deployment:
1. Set up monitoring and alerting
2. Implement automated backups
3. Set up staging environment
4. Configure CI/CD pipeline
5. Implement security scanning
