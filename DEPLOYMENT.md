# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Direct Deploy (Recommended)
1. Copy the entire `crypto-tracker` folder to your local machine
2. Install Vercel CLI: `npm install -g vercel`
3. Navigate to the project folder: `cd crypto-tracker`
4. Run: `vercel`
5. Follow the prompts to deploy

### Option 2: GitHub Integration
1. Push the `crypto-tracker` folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project and deploy

### Option 3: Drag & Drop
1. Build the project: `npm run build`
2. Go to [vercel.com](https://vercel.com) and sign in
3. Drag and drop the `dist` folder to deploy

## Other Deployment Options

### Netlify
1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com) and sign in
3. Drag and drop the `dist` folder or connect your GitHub repository

### GitHub Pages
1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json` scripts:
   ```json
   "homepage": "https://your-username.github.io/crypto-tracker",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## Build Configuration

The project is configured with:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite (auto-detected)
- **Node Version**: 16+

## Environment Variables

No environment variables are required for the basic setup. The app uses:
- **API**: CoinGecko free tier (no API key needed)
- **Storage**: localStorage for watchlist and theme preferences

## Performance Optimization

The build includes:
- ✅ Tree shaking for smaller bundle size
- ✅ CSS minification
- ✅ Image optimization
- ✅ Lazy loading
- ✅ Responsive design
- ✅ SEO meta tags

## Post-Deployment

After deployment, your app will have:
- 🚀 Real-time crypto price tracking
- 📊 Interactive charts with Chart.js
- ⭐ Persistent watchlist functionality
- 🌙 Dark/Light mode toggle
- 📱 Mobile-responsive design
- 🔍 Search functionality

## Troubleshooting

### Build Errors
- Ensure Node.js version is 16 or higher
- Clear cache: `npm run clean` then `npm install`
- Check for missing dependencies: `npm install`

### Runtime Issues
- Charts not loading: Ensure Chart.js is properly installed
- Theme not persisting: Check localStorage permissions
- Mobile navigation: Verify responsive breakpoints

## Custom Domain

To use a custom domain:
1. **Vercel**: Add domain in project settings
2. **Netlify**: Add domain in site settings
3. **GitHub Pages**: Add CNAME file to public folder

## Analytics (Optional)

To add analytics:
1. Add tracking code to `index.html`
2. Or use environment variables for tracking IDs
3. Popular options: Google Analytics, Vercel Analytics, Plausible

## Security Headers

The app includes security headers via `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## Monitoring

Recommended monitoring tools:
- **Vercel**: Built-in analytics and monitoring
- **Netlify**: Site analytics
- **UptimeRobot**: Free uptime monitoring
- **Sentry**: Error tracking (optional)

Need help? Check the README.md for development instructions.