# 🚀 Deployment Guide - EIMS Portal

## 🔗 URLs to Change When Hosting

**🎉 GREAT NEWS!** We've centralized all URLs in one place, so you only need to change them in **2 files** instead of searching through your entire codebase!

### 1. **Frontend URLs (Most Important)**
**File:** `frontend/src/utils/constants.js`
```javascript
// Change this one line and all frontend URLs will update automatically!
export const BASE_URL = 'http://localhost:8000'  // ← CHANGE THIS

// Optional: Also change frontend URL if needed
export const FRONTEND_URL = 'http://localhost:5173'  // ← CHANGE THIS IF NEEDED
```

**Change to:**
- **Render:** `https://your-app-name.onrender.com`
- **Vercel:** `https://your-app-name.vercel.app/api`
- **Netlify:** `https://your-app-name.netlify.app/.netlify/functions/api`
- **Custom Domain:** `https://api.yourdomain.com`

### 2. **Backend URLs**
**File:** `backend/config.js`
```javascript
// Change these URLs for backend configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';  // ← CHANGE THIS
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';  // ← CHANGE THIS IF NEEDED
```

## 🎯 **How It Works Now**

✅ **All frontend components** automatically use `BASE_URL` from `constants.js`
✅ **All backend endpoints** automatically use `API_BASE_URL` from `config.js`
✅ **No more hardcoded URLs** scattered throughout your codebase
✅ **Change once, update everywhere!**

## 🔧 **Environment Variables Setup (Recommended)**

### Frontend (.env)
```bash
VITE_API_BASE_URL=https://your-backend-url.com
VITE_FRONTEND_URL=https://your-frontend-url.com
```

### Backend (.env)
```bash
API_BASE_URL=https://your-backend-url.com
FRONTEND_URL=https://your-frontend-url.com
```

## 📝 **Quick Deployment Checklist**

- [ ] Update `frontend/src/utils/constants.js` BASE_URL
- [ ] Update `backend/config.js` API_BASE_URL (or set environment variables)
- [ ] Set environment variables in your hosting platform
- [ ] Test all API endpoints
- [ ] Update CORS settings if needed

## 🚨 **Important Notes**

1. **CORS Configuration:** Ensure your backend allows requests from your frontend domain
2. **Environment Variables:** Use environment variables for sensitive URLs
3. **Testing:** Always test your API endpoints after deployment
4. **SSL:** Use HTTPS URLs in production
5. **Domain:** Consider using a custom domain for better user experience

## 🔍 **What Was Centralized**

The following components now automatically use the centralized URLs:
- ✅ All React components (CourseStudents, Mycourses, etc.)
- ✅ All API calls via axiosInstance
- ✅ Backend internal fetch calls
- ✅ Debug/testing scripts
- ✅ All API endpoints are now managed in one place
