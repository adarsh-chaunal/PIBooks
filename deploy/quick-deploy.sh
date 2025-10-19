#!/bin/bash

# Quick AWS Deployment Script
# This script provides a simple way to deploy your Book API to AWS

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Book API - Quick AWS Deployment${NC}"
echo "=================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI configured successfully${NC}"

# Get user input
read -p "Enter your S3 bucket name: " S3_BUCKET
read -p "Enter your AWS region (default: us-east-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-us-east-1}

echo -e "${YELLOW}📦 Building and deploying frontend...${NC}"

# Build frontend
cd PiBooksWebUI
npm install
npm run build

# Deploy to S3
aws s3 sync build/ s3://$S3_BUCKET/frontend/ --delete
aws s3 website s3://$S3_BUCKET/frontend/ --index-document index.html --error-document index.html

echo -e "${GREEN}✅ Frontend deployed to S3${NC}"

# Get S3 website URL
S3_WEBSITE_URL="http://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com/frontend/"

echo -e "${YELLOW}📦 Preparing backend for deployment...${NC}"

# Prepare backend
cd ../PiBooksAPI
npm install

# Create deployment package
zip -r ../backend-deployment.zip . -x "node_modules/.cache/*" "*.log"

echo -e "${GREEN}✅ Backend package created${NC}"

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Upload backend-deployment.zip to AWS Lambda"
echo "2. Configure environment variables in Lambda"
echo "3. Set up API Gateway"
echo "4. Update frontend API URL"
echo ""
echo -e "${BLUE}🌐 Your frontend is available at:${NC}"
echo -e "${GREEN}$S3_WEBSITE_URL${NC}"
echo ""
echo -e "${YELLOW}📝 Backend deployment package: backend-deployment.zip${NC}"
echo ""
echo -e "${BLUE}🔧 To complete the setup:${NC}"
echo "1. Go to AWS Lambda console"
echo "2. Create a new function"
echo "3. Upload backend-deployment.zip"
echo "4. Set handler to 'server.handler'"
echo "5. Configure environment variables"
echo "6. Create API Gateway trigger"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
