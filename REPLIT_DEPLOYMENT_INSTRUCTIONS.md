# Replit Deployment Instructions

## The Problem
Replit deployment fails because the `.replit` file contains `npm run dev` which is flagged as a security risk.

## The Solution
I've created multiple production entry points that bypass the .replit configuration:

## Deployment Options

### Option 1: Use main.js (Recommended)
In Replit's deployment settings, set the run command to:
```
node main.js
```

### Option 2: Use index.js
In Replit's deployment settings, set the run command to:
```
node index.js
```

### Option 3: Use start.js (Simple)
In Replit's deployment settings, set the run command to:
```
node start.js
```

### Option 4: Use build-and-start.js (Full Build)
In Replit's deployment settings, set the run command to:
```
node build-and-start.js
```

## How to Deploy

1. Click the "Deploy" button in Replit
2. In the deployment configuration, change the run command from `npm run dev` to one of the options above
3. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=5000` (or leave default)
   - Add your `DATABASE_URL` and other required environment variables
4. Click "Deploy"

## What Each Script Does

- **main.js**: Builds if needed, starts production server with fallback
- **index.js**: Simple wrapper that ensures production mode
- **start.js**: Direct production server start without build
- **build-and-start.js**: Full build process then start production server

## Environment Variables Required

Set these in your Replit deployment environment:
- `NODE_ENV=production`
- `DATABASE_URL` (your PostgreSQL connection)
- `SESSION_SECRET` (secure random string)
- Any API keys your application uses

All scripts automatically set `NODE_ENV=production` regardless of the .replit configuration.