#!/bin/bash

# Production deployment script for Replit
echo "🚀 Starting production deployment..."

# Set production environment
export NODE_ENV=production

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Start the production server
echo "🌟 Starting production server..."
npm start