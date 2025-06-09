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
npm ci

# Build the frontend
echo "Building frontend..."
cd client && npm run build && cd ..

# Create proper directory structure
mkdir -p dist/public
cp -r client/dist/* dist/public/

# Verify build output
echo "Build verification:"
ls -la dist/public/
echo "Functions directory:"
ls -la netlify/functions/

echo "Netlify build complete!"