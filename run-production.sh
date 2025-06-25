#!/bin/bash

# Production startup script for Replit deployment
# This script handles the complete production build and startup process

set -e

echo "🚀 Starting production deployment process..."

# Set production environment
export NODE_ENV=production
export PORT=${PORT:-5000}

# Function to check if build exists
check_build() {
    if [ -d "./dist" ] && [ -f "./dist/index.js" ] && [ -d "./dist/public" ]; then
        echo "✅ Build artifacts found"
        return 0
    else
        echo "🔍 Build artifacts not found"
        return 1
    fi
}

# Function to run build
run_build() {
    echo "📦 Building application..."
    npm run build
    echo "✅ Build completed"
}

# Function to start production server
start_server() {
    echo "🌟 Starting production server on port $PORT..."
    npm start
}

# Main execution
main() {
    # Check if build exists, if not build it
    if ! check_build; then
        run_build
    fi
    
    # Start the production server
    start_server
}

# Handle graceful shutdown
trap 'echo "📡 Shutting down gracefully..."; exit 0' SIGTERM SIGINT

# Run main function
main