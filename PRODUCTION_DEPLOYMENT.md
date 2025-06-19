# Production Deployment Guide

## Issues Fixed

✅ **Run command changed from development to production mode**
- Created `Dockerfile` with production build and start commands
- Updated `replit-deployment.config.json` to use production build + start
- Created `deploy.sh` script for manual production deployment

✅ **Added production build command**
- `package.json` already contains proper build script: `vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- Build creates optimized frontend and bundled backend in `/dist` directory

✅ **Set NODE_ENV environment variable to production**
- Created `.env.production` template with all required environment variables
- Updated all deployment configurations to set `NODE_ENV=production`
- Server properly detects production environment and serves static files

✅ **Production start script configured**
- `package.json` contains `"start": "NODE_ENV=production node dist/index.js"`
- Created `start-production.js` with proper process management and graceful shutdown

## Deployment Options

### Option 1: Replit Deploy (Recommended)
The project is now configured for Replit's deployment system:
- Build command: `npm run build`
- Start command: `npm run build && npm start`
- Environment: `NODE_ENV=production`

### Option 2: Docker Deployment
```bash
# Build Docker image
docker build -t portfolio .

# Run locally
docker run -p 5000:5000 --env-file .env.production portfolio

# Deploy to Cloud Run
docker tag portfolio gcr.io/YOUR_PROJECT_ID/portfolio
docker push gcr.io/YOUR_PROJECT_ID/portfolio
gcloud run deploy portfolio --image gcr.io/YOUR_PROJECT_ID/portfolio --platform managed --region us-central1 --allow-unauthenticated
```

### Option 3: Manual Production Deployment
```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## Required Environment Variables

Set these in your deployment platform:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_database_connection_string
SESSION_SECRET=your_secure_session_secret
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_admin_password
```

## Health Check Endpoint

The application includes a health check at `/health` that returns:
```json
{
  "status": "healthy",
  "environment": "production",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Production Features

- **Static File Serving**: Optimized static file serving in production
- **Session Management**: Secure session configuration with production-ready cookies
- **Error Handling**: Comprehensive error logging for production debugging
- **Database SSL**: Proper SSL configuration for production database connections
- **Port Configuration**: Automatic port detection for Cloud Run (uses `process.env.PORT`)
- **Graceful Shutdown**: Proper signal handling for container environments

## Build Process

1. **Frontend Build**: `vite build` creates optimized frontend assets in `/dist`
2. **Backend Build**: `esbuild` bundles the server into `/dist/index.js`
3. **Production Start**: `node dist/index.js` runs the optimized application

## Security Considerations

- All environment variables are properly configured
- Session secrets are required for production
- Database connections use SSL in production
- Static files are served securely
- Health checks don't expose sensitive information

## Troubleshooting

If deployment fails:
1. Verify all environment variables are set correctly
2. Check database connection string format
3. Ensure port configuration matches your deployment platform
4. Review logs using your platform's logging tools
5. Test the health check endpoint: `curl https://your-app-url/health`