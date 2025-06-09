#!/bin/bash

# Debug environment variables for Netlify
echo "=== Environment Variables Check ==="
echo "DATABASE_URL: ${DATABASE_URL:+SET}"
echo "EMAIL_USER: ${EMAIL_USER:+SET}"
echo "EMAIL_PASSWORD: ${EMAIL_PASSWORD:+SET}"
echo "ADMIN_USERNAME: ${ADMIN_USERNAME:+SET}"
echo "ADMIN_PASSWORD: ${ADMIN_PASSWORD:+SET}"
echo "=================================="

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the frontend
echo "Building frontend..."
npm run build

# Create proper directory structure
echo "Creating directory structure..."
mkdir -p dist/public
cp -r dist/* dist/public/

# Copy functions
echo "Copying functions..."
mkdir -p dist/functions
cp -r netlify/functions/* dist/functions/

# Verify build output
echo "Build verification:"
ls -la dist/public/
echo "Functions directory:"
ls -la dist/functions/

echo "Netlify build complete!"