#!/bin/bash

# Production deployment script
echo "Starting production build..."

# Install dependencies
npm ci

# Build the application
npm run build

# Start production server
echo "Starting production server..."
NODE_ENV=production npm start