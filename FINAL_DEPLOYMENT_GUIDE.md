# Complete Portfolio Deployment Guide

## Your Portfolio Ecosystem
- **Main Portfolio**: React/Express application with admin panel
- **AI Chatbot**: https://huggingface.co/spaces/monideep2255/career_Monideep_Bethesda
- **Projects**: 4 real projects with live demo URLs
- **Admin Panel**: Full CRUD operations with authentication

## Netlify Environment Variables
Add these in Netlify Dashboard > Site Settings > Environment Variables:

```
DATABASE_URL=postgresql://[neon-connection-string]
EMAIL_USER=monideep2255@gmail.com
EMAIL_PASSWORD=[gmail-app-password]
ADMIN_USERNAME=monideep2255
ADMIN_PASSWORD=Guttu@GSA2024deep
HF_TOKEN=[your-huggingface-token]
NODE_ENV=production
```

## Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Functions Directory**: `netlify/functions`

## Database Migration
After deployment, run: `/.netlify/functions/neon-migration`

This creates tables and migrates your projects:
- Personal Portfolio (ID: 9, Featured)
- Fin Buddy (ID: 10, Featured) 
- Insight Lens (ID: 11)
- Daily Quote Sender (ID: 12)

## Live Demo URLs
- Personal Portfolio: https://monideep-chakraborti.netlify.app
- Fin Buddy: https://fin-buddy-demo.netlify.app
- Insight Lens: https://insight-lens-demo.netlify.app
- Daily Quote Sender: https://daily-quote-sender.netlify.app

## Verification Checklist
- [ ] Projects API working: `/.netlify/functions/api/projects`
- [ ] Admin login: `/.netlify/functions/api/admin/login`
- [ ] Contact form: `/.netlify/functions/api/contact`
- [ ] Live demo buttons functional
- [ ] Admin edit forms pre-populated
- [ ] Chatbot integration working

Your Replit environment is production-ready with all features working correctly.