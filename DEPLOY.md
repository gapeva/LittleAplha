# 🚀 Little Alpha - Sevalla Deployment Guide

## Overview
This guide explains how to deploy Little Alpha to Sevalla with PostgreSQL database.

---

## Architecture
- **Frontend**: React + Vite (Static site)
- **Backend**: FastAPI + Python
- **Database**: PostgreSQL

---

## Step 1: Deploy Backend to Sevalla

### 1.1 Create a New Application
1. Go to [Sevalla Dashboard](https://sevalla.com)
2. Click **"Create Application"**
3. Connect your GitHub repository
4. Select the `server` folder as the root directory

### 1.2 Configure Build Settings
- **Build Command**: (leave empty - uses Dockerfile)
- **Dockerfile Path**: `Dockerfile`

### 1.3 Add PostgreSQL Database
1. In your application settings, go to **"Databases"**
2. Click **"Add Database"** → Select **PostgreSQL**
3. Sevalla will automatically set the `DATABASE_URL` environment variable

### 1.4 Set Environment Variables
Add these in Sevalla's **Environment Variables** section:

| Variable | Value |
|----------|-------|
| `SECRET_KEY` | Generate with: `openssl rand -hex 32` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `43200` |
| `ALGORITHM` | `HS256` |
| `ALLOWED_ORIGINS` | `https://your-frontend.sevalla.app` |

### 1.5 Deploy
Click **"Deploy"** and wait for the build to complete.

---

## Step 2: Deploy Frontend to Sevalla

### 2.1 Create Another Application
1. Click **"Create Application"**
2. Connect the same repository
3. Select the root folder (where `package.json` is)

### 2.2 Configure Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.3 Set Environment Variables
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend.sevalla.app/api` |

### 2.4 Deploy
Click **"Deploy"** and wait for the build to complete.

---

## Step 3: Update CORS

After both are deployed, update the backend's `ALLOWED_ORIGINS`:

```
ALLOWED_ORIGINS=https://your-frontend.sevalla.app,https://littlealpha.com
```

---

## Environment Variables Summary

### Backend (`server/.env`)
```env
DATABASE_URL=postgresql://... (auto-set by Sevalla)
SECRET_KEY=your_secure_random_key
ACCESS_TOKEN_EXPIRE_MINUTES=43200
ALGORITHM=HS256
ALLOWED_ORIGINS=https://your-frontend.sevalla.app
```

### Frontend (`.env.production`)
```env
VITE_API_URL=https://your-backend.sevalla.app/api
```

---

## Custom Domain Setup

1. Go to your application settings
2. Click **"Domains"**
3. Add your custom domain (e.g., `littlealpha.com`)
4. Update DNS records as instructed by Sevalla
5. SSL certificate will be automatically provisioned

---

## Database Migrations

After initial deployment, run migrations:

```bash
# Connect to your Sevalla app's shell
alembic upgrade head
```

Or configure this as a **Release Command** in Sevalla.

---

## Troubleshooting

### CORS Errors
- Ensure `ALLOWED_ORIGINS` includes your frontend URL
- No trailing slashes in URLs

### Database Connection Issues
- Verify `DATABASE_URL` is set (check Sevalla dashboard)
- Ensure PostgreSQL addon is properly provisioned

### 500 Errors
- Check application logs in Sevalla dashboard
- Verify all environment variables are set

---

## YouTube Video Placeholder

Don't forget to replace the YouTube video embed in `src/pages/Landing.jsx`:

```jsx
src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
```

Replace `YOUR_VIDEO_ID` with your actual YouTube video ID.

---

## Support

For issues, contact: team@littlealphabiotech.com
