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
vite build

echo "Netlify build complete!"