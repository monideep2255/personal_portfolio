# Production Deployment Guide

## Deployment Fixes Applied

✅ **Production Build Configuration**
- Created Dockerfile for containerized deployment
- Added production startup script (`start-production.js`)
- Configured Cloud Run deployment (`cloudbuild.yaml`)
- Added App Engine configuration (`app.yaml`)

✅ **Server Configuration Updates**
- Added health check endpoint at `/health`
- Configured production environment variables
- Enhanced error logging for production debugging
- Updated database connection with SSL support

✅ **Environment Configuration**
- Created `.env.production` template
- Added production-ready session management
- Configured proper port handling for Cloud Run

## Deployment Options

### Option 1: Cloud Run (Recommended)
```bash
# Build and deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or deploy directly
docker build -t portfolio .
docker tag portfolio gcr.io/YOUR_PROJECT_ID/portfolio
docker push gcr.io/YOUR_PROJECT_ID/portfolio
gcloud run deploy portfolio --image gcr.io/YOUR_PROJECT_ID/portfolio --platform managed --region us-central1 --allow-unauthenticated
```

### Option 2: App Engine
```bash
gcloud app deploy app.yaml
```

### Option 3: Docker Deployment
```bash
docker build -t portfolio .
docker run -p 5000:5000 --env-file .env.production portfolio
```

### Option 4: Manual Production Start
```bash
# Using the production script
node start-production.js

# Or using the deploy script
./deploy.sh
```

## Required Environment Variables

Set these in your deployment platform:

- `NODE_ENV=production`
- `DATABASE_URL=your_database_connection_string`
- `SESSION_SECRET=your_secure_session_secret`
- `SENDGRID_API_KEY=your_sendgrid_key` (for contact form)
- `ADMIN_USERNAME=your_admin_username`
- `ADMIN_PASSWORD=your_admin_password`
- `PORT=5000` (or let Cloud Run set it automatically)

## Health Check

Your deployment will include a health check endpoint at `/health` that returns:
```json
{
  "status": "healthy",
  "environment": "production",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Build Process

The production build will:
1. Install dependencies with `npm ci`
2. Build frontend with `vite build`
3. Build backend with `esbuild`
4. Start production server with `npm start`

## Troubleshooting

If deployment fails:
1. Check that all environment variables are set
2. Verify database connection string is correct
3. Ensure port configuration matches your platform
4. Check logs using platform-specific tools