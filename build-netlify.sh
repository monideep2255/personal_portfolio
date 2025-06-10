#!/bin/bash

echo "Starting Netlify build process..."

# Install dependencies
npm ci

# Build the frontend
echo "Building frontend with Vite..."
vite build

# Ensure dist directory structure is correct for Netlify
echo "Preparing build output..."
if [ -d "dist/public" ]; then
  echo "Moving files from dist/public to dist..."
  cp -r dist/public/* dist/
  rm -rf dist/public
fi

# Ensure index.html is in the root of dist
if [ ! -f "dist/index.html" ]; then
  echo "ERROR: index.html not found in dist directory"
  ls -la dist/
  exit 1
fi

echo "Build completed successfully!"
echo "Files in dist directory:"
ls -la dist/