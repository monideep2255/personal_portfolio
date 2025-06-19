# Replit Deployment Fix

## The Problem
Replit's deployment system is reading the `.replit` file which contains `npm run dev` in the deployment section, causing it to try to run in development mode instead of production mode.

## The Solution
Since we cannot modify the `.replit` file directly, we need to work around this limitation by creating a smart wrapper that detects deployment vs development environments.

## Files Created

1. **replit-deploy.js** - Production deployment script
2. **smart-dev.js** - Environment-aware development script  
3. **production-server.js** - Simple production server launcher
4. **dev** - Alternative development command

## How to Deploy on Replit

### Option 1: Use the Deploy Button (Recommended)
1. Click the "Deploy" button in Replit
2. Replit will automatically detect the production configuration
3. The system will build and deploy your app

### Option 2: Manual Deployment Command
If the deploy button still uses dev mode, try these commands in the shell:

```bash
# Set production environment and deploy
NODE_ENV=production node replit-deploy.js
```

Or:

```bash
# Build and start production
npm run build && npm start
```

### Option 3: Alternative Package Script
Create a custom npm script that bypasses the .replit configuration:

```bash
# In the shell, run:
node -e "
const { spawn } = require('child_process');
process.env.NODE_ENV = 'production';
const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
build.on('close', () => {
  spawn('npm', ['start'], { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } });
});
"
```

## Verification Steps

1. Check that the build completes successfully
2. Verify the production server starts on the correct port
3. Test the health check endpoint: `/health`
4. Confirm the application loads properly

## Environment Variables for Deployment

Make sure these are set in your Replit secrets:

- `NODE_ENV=production`
- `DATABASE_URL` (your database connection)
- `SESSION_SECRET` (secure random string)
- `SENDGRID_API_KEY` (if using email features)

## If Deployment Still Fails

1. Try deploying using the Docker configuration:
   - Use the provided `Dockerfile`
   - Deploy to Cloud Run or similar container service

2. Contact Replit support about the deployment configuration issue

3. Use the manual deployment script: `./deploy.sh`