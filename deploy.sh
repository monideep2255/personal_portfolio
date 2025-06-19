#!/bin/bash

echo "🚀 Starting production deployment..."

# Set production environment
export NODE_ENV=production

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Start the production server
echo "🌟 Starting production server..."
npm start