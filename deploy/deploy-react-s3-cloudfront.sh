#!/bin/bash

# React S3 + CloudFront Deployment Script
# Make sure AWS CLI is configured with proper credentials

echo "🚀 Starting React deployment to S3 + CloudFront..."

# Configuration
BUCKET_NAME="pibooks-webapp"
REGION="eu-north-1"
DISTRIBUTION_ID="" # You'll get this after creating CloudFront distribution

# Build React app
echo "📦 Building React app for production..."
cd ../PiBooksWebUI
npm run build:prod

# Upload to S3
echo "☁️ Uploading to S3..."
aws s3 sync build/ s3://$BUCKET_NAME/ --delete --region $REGION

# Set proper content types
echo "🔧 Setting content types..."
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html --content-type "text/html" --metadata-directive REPLACE
aws s3 cp s3://$BUCKET_NAME/static/ s3://$BUCKET_NAME/static/ --recursive --content-type "application/javascript" --metadata-directive REPLACE

# Invalidate CloudFront cache (if distribution exists)
if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
fi

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at: https://$BUCKET_NAME.s3.$REGION.amazonaws.com"
