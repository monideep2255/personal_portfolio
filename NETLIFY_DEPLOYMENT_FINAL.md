# Netlify Deployment Settings - EXACT CONFIGURATION

## Current Status
✅ Environment variables: All 5 variables correctly set
✅ Database: 4 projects exist, tables created
❌ API: Still using old WebSocket configuration causing failures
❌ Frontend: Not building properly

## Required Netlify Build Settings

### Site Settings → Build & Deploy → Build Settings
```
Build command: npm ci && vite build
Publish directory: dist
Functions directory: netlify/functions
```

### Site Settings → Build & Deploy → Environment Variables
Verify these exact variable names exist:
- DATABASE_URL
- EMAIL_USER  
- EMAIL_PASSWORD
- ADMIN_USERNAME
- ADMIN_PASSWORD

## Deploy Process

1. **Push Code to GitHub:**
```bash
git add .
git commit -m "Fix Netlify deployment: HTTP adapter + build config"
git push origin main
```

2. **Clear Cache & Deploy:**
- Netlify Dashboard → Deploys
- Click "Trigger deploy" → "Clear cache and deploy site"

3. **Verification URLs:**
- Frontend: https://monideep-chakraborti.netlify.app/
- API Test: https://monideep-chakraborti.netlify.app/.netlify/functions/api/projects
- Debug: https://monideep-chakraborti.netlify.app/.netlify/functions/api/debug

## Expected Results After Deploy
- Projects page shows 4 projects from database
- Contact form submits without 500 errors  
- Admin login works with your credentials
- All API endpoints return JSON data instead of "Internal Server Error"