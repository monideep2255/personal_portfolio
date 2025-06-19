# Production Deployment Guide

## Deployment Issue Fixed

The deployment was failing because the `.replit` file contained `npm run dev` in the deployment configuration, which is flagged as a security risk in production environments.

## Applied Fixes

### 1. Production Run Command
- Created `production-deploy.js` - Complete production deployment script
- Created `start-production.js` - Alternative production startup
- Created `deploy.sh` - Simple bash deployment script

### 2. Production Build Process
- The existing `package.json` already contains proper build script
- Build command: `vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- Start command: `NODE_ENV=production node dist/index.js`

### 3. Environment Configuration
- Created `.env.production` template with required production variables
- Set `NODE_ENV=production` in all deployment scripts
- Added `replit.config.json` for alternative deployment configuration

### 4. Docker Support
- Created `Dockerfile` for containerized deployment
- Includes health checks and proper production configuration

## Deployment Options

### Option 1: Direct Replit Deployment (Recommended)
Use the Replit Deploy button with these configurations:
- Build Command: `npm run build`
- Start Command: `node production-deploy.js`
- Environment: `NODE_ENV=production`

### Option 2: Manual Production Script
```bash
node production-deploy.js
```

### Option 3: Traditional Build + Start
```bash
npm run build && NODE_ENV=production npm start
```

### Option 4: Docker Deployment
```bash
docker build -t portfolio .
docker run -p 5000:5000 --env-file .env.production portfolio
```

## Environment Variables Required

Make sure these are set in your deployment environment:
- `NODE_ENV=production`
- `DATABASE_URL` (your PostgreSQL connection string)
- `SESSION_SECRET` (secure random string)
- Any other API keys your app uses

## Verification

After deployment, verify:
1. Health endpoint: `/health` returns status and environment
2. Application loads without build errors
3. Database connections work properly
4. Static assets are served correctly

The server automatically detects production mode and serves static files from the built assets.