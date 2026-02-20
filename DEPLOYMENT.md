# Deployment Guide

## 🚀 Quick Push to GitHub

The remote is already configured. You just need to authenticate and push:

### Option 1: Using GitHub CLI (Easiest)
```bash
# Install GitHub CLI if not installed
# Then authenticate:
gh auth login

# Push your code
git push -u origin main
```

### Option 2: Using Personal Access Token
1. Generate a token: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: "Trust-Bridge-app"
   - Select scopes: `repo` (full control)
   - Generate and copy the token

2. Push with token:
```bash
git push -u origin main
# When prompted:
# Username: Kishansingh063
# Password: [paste your token here]
```

### Option 3: Use SSH (If you have SSH keys)
```bash
git remote set-url origin git@github.com:Kishansingh063/Trust-Bridge-app.git
git push -u origin main
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

1. **Go to [Vercel](https://vercel.com)** and sign in with GitHub
2. **Click "Add New Project"**
3. **Import your repository**: `Kishansingh063/Trust-Bridge-app`
4. **Configure**:
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Environment Variables** (if needed):
   - `VITE_API_BASE_URL` (if you have a backend)
6. **Click "Deploy"**

**Your app will be live at**: `https://trust-bridge-app.vercel.app` (or similar)

### Option 2: Netlify (Free & Easy)

1. **Go to [Netlify](https://netlify.com)** and sign in with GitHub
2. **Click "Add new site" → "Import an existing project"**
3. **Connect to GitHub** and select `Trust-Bridge-app`
4. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Click "Deploy site"**

**Your app will be live at**: `https://trust-bridge-app.netlify.app` (or similar)

### Option 3: GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Deploy**:
```bash
npm run deploy
```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

**Your app will be live at**: `https://kishansingh063.github.io/Trust-Bridge-app/`

### Option 4: Render (Free)

1. **Go to [Render](https://render.com)** and sign in with GitHub
2. **Click "New" → "Static Site"**
3. **Connect repository**: `Kishansingh063/Trust-Bridge-app`
4. **Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. **Click "Create Static Site"**

## 🔧 Local Development

To run locally:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# App runs on: http://localhost:3000
```

## 📝 Important Notes

### InstantDB Configuration
- Your InstantDB App ID is already configured: `b9ce6a2a-5f26-40a5-9239-5c6dced07a65`
- Make sure your InstantDB schema matches the one in `src/lib/instantdb.js`

### Environment Variables
For production, create `.env.production`:
```
VITE_API_BASE_URL=your-production-api-url
```

### OTP Email Service
Currently, OTP codes are logged to console in development. For production:
- Integrate with SendGrid, AWS SES, or Resend
- Update `src/services/otpService.js`

## 🎯 Recommended: Vercel Deployment

**Why Vercel?**
- ✅ Free tier
- ✅ Automatic deployments on push
- ✅ Fast CDN
- ✅ Easy GitHub integration
- ✅ Custom domains

**Quick Deploy**:
1. Push code to GitHub (see above)
2. Go to https://vercel.com/new
3. Import `Trust-Bridge-app`
4. Deploy!

Your live link will be provided after deployment! 🚀
