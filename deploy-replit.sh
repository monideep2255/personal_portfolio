#!/bin/bash

echo "Starting Replit deployment workaround..."

# Set production environment
export NODE_ENV=production

# Skip the slow build process and run server directly in production mode
echo "Starting production server without build..."
tsx server/index.ts