# React S3 + CloudFront Deployment Script for PowerShell
# Make sure AWS CLI is configured with proper credentials

Write-Host "🚀 Starting React deployment to S3 + CloudFront..." -ForegroundColor Green

# Configuration
$BUCKET_NAME = "pibooks-webapp"
$REGION = "eu-north-1"
$DISTRIBUTION_ID = "" # You'll get this after creating CloudFront distribution

# Build React app
Write-Host "📦 Building React app for production..." -ForegroundColor Yellow
Set-Location ..\PiBooksWebUI
npm run build:prod

# Upload to S3
Write-Host "☁️ Uploading to S3..." -ForegroundColor Yellow
aws s3 sync build/ s3://$BUCKET_NAME/ --delete --region $REGION

# Set proper content types
Write-Host "🔧 Setting content types..." -ForegroundColor Yellow
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html --content-type "text/html" --metadata-directive REPLACE

# Invalidate CloudFront cache (if distribution exists)
if ($DISTRIBUTION_ID -ne "") {
    Write-Host "🔄 Invalidating CloudFront cache..." -ForegroundColor Yellow
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
}

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your app should be available at: https://$BUCKET_NAME.s3.$REGION.amazonaws.com" -ForegroundColor Cyan
