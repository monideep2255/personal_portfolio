# Critical Deployment Fix

## Current Issues
1. Frontend showing "Page not found" - build configuration problem
2. API returning database WebSocket errors - wrong database adapter
3. Environment variables work but code changes not deployed

## Fixed Files
- `netlify/functions/api.js` - Changed to HTTP adapter for Neon
- `netlify.toml` - Simplified build command
- Database connection - Removed WebSocket, using neon HTTP

## Deployment Commands Required

### 1. Commit Changes
```bash
git add .
git commit -m "Fix: Neon HTTP adapter + build config for Netlify"
git push origin main
```

### 2. Netlify Build Settings
In Netlify Dashboard → Site Settings → Build & Deploy:
- Build command: `npm ci && vite build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

### 3. Force Deploy
Netlify Dashboard → Deploys → "Clear cache and deploy site"

## Verification After Deploy
- Projects API: https://monideep-chakraborti.netlify.app/.netlify/functions/api/projects
- Debug endpoint: https://monideep-chakraborti.netlify.app/.netlify/functions/api/debug
- Frontend: https://monideep-chakraborti.netlify.app/

Expected: All endpoints return data, frontend loads properly.