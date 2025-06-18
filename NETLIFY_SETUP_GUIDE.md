# Complete Netlify Setup Guide

## Environment Variables (Required)

Add these in Netlify Dashboard > Site Settings > Environment Variables:

```
DATABASE_URL=postgresql://[your-neon-connection-string]
EMAIL_USER=monideep2255@gmail.com
EMAIL_PASSWORD=[your-gmail-app-password]
ADMIN_USERNAME=monideep2255
ADMIN_PASSWORD=Guttu@GSA2024deep
NODE_ENV=production
```

## Neon Database Setup Steps

### 1. Create Neon Database
- Go to https://neon.tech
- Create new project: "personal-portfolio"
- Copy the connection string

### 2. Add Connection String to Netlify
- Paste Neon connection string as `DATABASE_URL` in Netlify environment variables

### 3. Deploy & Migrate Data
After deployment, run this function to create tables and migrate your projects:
```
https://[your-netlify-site].netlify.app/.netlify/functions/neon-migration
```

## Project Migration Details

The migration will create these tables and insert your exact projects:

**Projects (ID 9-12):**
- Personal Portfolio (featured)
- Fin Buddy (featured) 
- Insight Lens
- Daily Quote Sender

**Live Demo URLs:**
- Personal Portfolio: https://monideep-chakraborti.netlify.app
- Fin Buddy: https://fin-buddy-demo.netlify.app
- Insight Lens: https://insight-lens-demo.netlify.app
- Daily Quote Sender: https://daily-quote-sender.netlify.app

## Verification Steps

1. Check migration: `/.netlify/functions/neon-migration`
2. Test projects API: `/.netlify/functions/api/projects`
3. Test admin login: `/.netlify/functions/api/admin/login`
4. Verify contact form: `/.netlify/functions/api/contact`

## Build Settings

**Build Command:** `npm run build`
**Publish Directory:** `dist`
**Functions Directory:** `netlify/functions`

Your Neon database will have identical data to your Replit environment with all functionality working.