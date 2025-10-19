#!/bin/bash

# AWS Deployment Script for Book API Project
# This script builds and deploys both frontend and backend to AWS

set -e

echo "🚀 Starting AWS deployment for Book API..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION=${AWS_REGION:-"us-east-1"}
S3_BUCKET_NAME=${S3_BUCKET_NAME:-"your-book-api-bucket"}
CLOUDFRONT_DISTRIBUTION_ID=${CLOUDFRONT_DISTRIBUTION_ID:-""}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI configured successfully${NC}"

# Function to build frontend
build_frontend() {
    echo -e "${YELLOW}📦 Building React frontend...${NC}"
    cd PiBooksWebUI
    
    # Install dependencies
    npm install
    
    # Build for production
    npm run build
    
    echo -e "${GREEN}✅ Frontend build completed${NC}"
    cd ..
}

# Function to build backend
build_backend() {
    echo -e "${YELLOW}📦 Preparing backend for deployment...${NC}"
    cd PiBooksAPI
    
    # Install production dependencies only
    npm ci --only=production
    
    echo -e "${GREEN}✅ Backend prepared for deployment${NC}"
    cd ..
}

# Function to deploy frontend to S3
deploy_frontend() {
    echo -e "${YELLOW}🌐 Deploying frontend to S3...${NC}"
    
    # Sync build files to S3
    aws s3 sync PiBooksWebUI/build/ s3://$S3_BUCKET_NAME/frontend/ \
        --delete \
        --cache-control "public, max-age=31536000" \
        --exclude "*.html" \
        --exclude "*.json"
    
    # Upload HTML files with no-cache
    aws s3 sync PiBooksWebUI/build/ s3://$S3_BUCKET_NAME/frontend/ \
        --cache-control "no-cache, no-store, must-revalidate" \
        --include "*.html" \
        --include "*.json"
    
    echo -e "${GREEN}✅ Frontend deployed to S3${NC}"
    
    # Invalidate CloudFront if distribution ID is provided
    if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
        aws cloudfront create-invalidation \
            --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
            --paths "/*"
        echo -e "${GREEN}✅ CloudFront cache invalidated${NC}"
    fi
}

# Function to deploy backend
deploy_backend() {
    echo -e "${YELLOW}🔧 Deploying backend to S3...${NC}"
    
    # Create a deployment package
    cd PiBooksAPI
    zip -r ../backend-deployment.zip . -x "node_modules/.cache/*" "*.log"
    cd ..
    
    # Upload backend package to S3
    aws s3 cp backend-deployment.zip s3://$S3_BUCKET_NAME/backend/
    
    # Clean up
    rm backend-deployment.zip
    
    echo -e "${GREEN}✅ Backend package uploaded to S3${NC}"
    echo -e "${YELLOW}📝 Note: You'll need to deploy this to AWS Lambda or EC2 manually${NC}"
}

# Function to create deployment package
create_deployment_package() {
    echo -e "${YELLOW}📦 Creating complete deployment package...${NC}"
    
    # Create deployment directory
    mkdir -p deployment
    
    # Copy frontend build
    cp -r PiBooksWebUI/build deployment/frontend
    
    # Copy backend
    cp -r PiBooksAPI deployment/backend
    cd deployment/backend
    npm ci --only=production
    cd ../..
    
    # Create zip file
    cd deployment
    zip -r ../book-api-deployment.zip . -x "backend/node_modules/.cache/*"
    cd ..
    
    echo -e "${GREEN}✅ Deployment package created: book-api-deployment.zip${NC}"
}

# Main deployment flow
main() {
    echo -e "${GREEN}🎯 Starting deployment process...${NC}"
    
    # Build applications
    build_frontend
    build_backend
    
    # Deploy to AWS
    deploy_frontend
    deploy_backend
    
    # Create deployment package
    create_deployment_package
    
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${YELLOW}📋 Next steps:${NC}"
    echo "1. Deploy backend to AWS Lambda or EC2"
    echo "2. Configure environment variables"
    echo "3. Set up database connection"
    echo "4. Test the deployed application"
    echo ""
    echo -e "${GREEN}🌐 Frontend URL: https://$S3_BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com/frontend/${NC}"
}

# Run main function
main
