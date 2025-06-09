# Netlify Deployment Troubleshooting

## Common 404 Error Solutions

### 1. Build Configuration Issues

**Problem:** "Page not found" or build failures
**Solution:** Verify build settings in Netlify dashboard

**In Netlify Dashboard:**
- Site settings → Build & deploy → Build settings
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

### 2. Environment Variables Missing

**Problem:** API calls failing, database connection errors
**Solution:** Add all required environment variables

**Required Variables:**
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
EMAIL_USER=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
```

**To Add Variables:**
1. Netlify Dashboard → Site settings → Environment variables
2. Click "Add variable"
3. Add each variable one by one

### 3. Database Connection Issues

**Problem:** 500 errors, database timeouts
**Solution:** Verify Neon Database setup

**Neon Database Setup:**
1. Go to [console.neon.tech](https://console.neon.tech)
2. Create project if not exists
3. Go to "Connection Details"
4. Copy connection string (includes password)
5. Add to Netlify as `DATABASE_URL`

**Connection String Format:**
```
postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 4. Function Deployment Issues

**Problem:** API routes returning 404
**Solution:** Check function logs and deployment

**Debug Steps:**
1. Netlify Dashboard → Functions tab
2. Check if `api` function is deployed
3. Click function name to view logs
4. Test function directly: `https://your-site.netlify.app/.netlify/functions/api/projects`

### 5. Routing Issues

**Problem:** Direct navigation to pages fails
**Solution:** Verify redirect configuration

**Check `netlify.toml` exists with:**
```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] All dependencies installed locally
- [ ] Build works locally: `npm run build`
- [ ] Environment variables documented

### During Deployment
- [ ] Connect GitHub repository to Netlify
- [ ] Build settings auto-detected from `netlify.toml`
- [ ] All environment variables added
- [ ] Build completes successfully
- [ ] Functions deploy successfully

### Post-Deployment Testing
- [ ] Homepage loads: `https://your-site.netlify.app`
- [ ] Projects page works: `https://your-site.netlify.app/projects`
- [ ] API endpoint responds: `https://your-site.netlify.app/.netlify/functions/api/projects`
- [ ] Contact form submits successfully
- [ ] Admin login works (if credentials set)

## Debug Commands

**Test API locally:**
```bash
# Test projects endpoint
curl https://your-site.netlify.app/.netlify/functions/api/projects

# Test analytics endpoint (POST)
curl -X POST https://your-site.netlify.app/.netlify/functions/api/analytics \
  -H "Content-Type: application/json" \
  -d '{"eventType":"test","path":"/test"}'
```

**Check build logs:**
1. Netlify Dashboard → Deploys
2. Click latest deploy
3. View "Deploy log" for errors

**Check function logs:**
1. Netlify Dashboard → Functions
2. Click function name
3. View real-time logs

## Common Error Messages

**"Page not found"**
- Missing `_redirects` file or `netlify.toml`
- Incorrect publish directory
- Build failed silently

**"Function not found"**
- Function didn't deploy
- Wrong function directory path
- Build process didn't include functions

**"Internal Server Error"**
- Database connection failed
- Missing environment variables
- Function code errors (check logs)

**"Unauthorized"**
- Admin credentials incorrect
- Environment variables not set
- Authentication headers missing