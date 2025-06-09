# Exact Netlify Deployment Settings

## Critical: Manual Build Settings Override

**The 404 error occurs because Netlify needs these EXACT settings configured manually:**

### 1. Build Settings (Site Settings → Build & Deploy → Build Settings)

**Build Command:**
```
vite build
```

**Publish Directory:**
```
dist/public
```

**Functions Directory:**
```
netlify/functions
```

### 2. Environment Variables (Site Settings → Environment Variables)

Add these exactly as shown:

```
DATABASE_URL=postgresql://your_username:your_password@your_host:5432/your_database?sslmode=require
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
EMAIL_USER=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
```

### 3. Deploy Settings Verification

After setting the above, trigger a new deploy:
1. Go to Deploys tab
2. Click "Trigger deploy" → "Deploy site"
3. Monitor the build log for errors

### 4. Post-Deploy Testing

Test these URLs immediately after successful deploy:

**Frontend:**
- `https://your-site.netlify.app/` (Homepage)
- `https://your-site.netlify.app/projects` (Projects page)
- `https://your-site.netlify.app/about` (About page)

**API Functions:**
- `https://your-site.netlify.app/.netlify/functions/api/projects`
- `https://your-site.netlify.app/.netlify/functions/api/analytics`

### 5. Common Issues & Solutions

**Issue: "Page not found" on homepage**
- Solution: Verify publish directory is `dist/public`
- Check build completed successfully

**Issue: API calls fail**
- Solution: Verify functions deployed in Functions tab
- Check environment variables are set correctly

**Issue: Build fails**
- Solution: Check build command is `vite build` (not `npm run build`)
- Verify Node.js version is 20 in environment settings

### 6. Required File Structure

Your repository must have these files:
```
├── netlify.toml
├── netlify/functions/api.js
├── client/public/_redirects
├── vite.config.ts
└── package.json
```

### 7. Database Setup (Neon)

If using Neon Database:
1. Create project at console.neon.tech
2. Get connection string from "Connection Details"
3. Format: `postgresql://username:password@host:port/database?sslmode=require`
4. Add as DATABASE_URL environment variable

### 8. Force Rebuild

If still getting 404 after correct settings:
1. Site Settings → Build & Deploy → Environment → Edit variables
2. Add temporary variable: `FORCE_REBUILD=1`
3. Trigger new deploy
4. Remove the temporary variable after successful deploy