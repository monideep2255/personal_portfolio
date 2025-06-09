#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Build the serverless function
echo "Building serverless functions..."
npx esbuild server/netlify-handler.js --platform=node --packages=external --bundle --format=esm --outdir=dist --external:@neondatabase/serverless --external:ws

echo "Netlify build complete!"