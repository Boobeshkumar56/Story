# Cloudinary Integration Setup Guide

## Overview
This photography portfolio uses **Cloudinary** for image storage and management. Each event is stored as a folder in Cloudinary, and all metadata is automatically managed.

##  Setup Steps

### 1. Create Cloudinary Account
1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. You'll get these credentials from your dashboard:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. Configure Environment Variables
1. Open `.env.local` in the project root
2. Replace the placeholder values with your Cloudinary credentials:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### 3. Install Dependencies
Already done! The `cloudinary` package is installed.

## How It Works

### Admin Upload Process
1. **Access Admin**: Double-click logo → Navigate to `/admin/blogs` → Enter password: `admin123`
2. **Create Event**:
   - Enter a **Folder Name** (e.g., "sarah-wedding-2024")
   - Fill in event details (title, description, location, etc.)
   - Upload **Cover Image** from your device
   - Upload **Gallery Images** from your device
   - Select sections to display in: Blogs, Recent Works, Library
3. **Submit**: All images go to Cloudinary, metadata is saved

### Folder Structure in Cloudinary
```
your-cloudinary-root/
├── sarah-wedding-2024/
│   ├── cover-image.jpg
│   ├── gallery-image-1.jpg
│   ├── gallery-image-2.jpg
│   └── metadata.json
├── john-pre-wedding/
│   ├── cover-image.jpg
│   ├── gallery-image-1.jpg
│   └── metadata.json
```

### Metadata Storage
Each folder contains a `metadata.json` file with:
```json
{
  "title": "Sarah & John's Wedding",
  "excerpt": "A beautiful celebration",
  "description": "Full story...",
  "category": "Wedding",
  "coverImage": "https://res.cloudinary.com/.../cover.jpg",
  "likes": 0,
  "views": 0,
  "addToBlogs": true,
  "addToRecentWorks": true,
  "addToLibrary": true
}
```

##  API Endpoints

### `/api/upload` - Upload Images
- **Method**: POST
- **Body**: FormData with file and folder name
- **Response**: Cloudinary URL

### `/api/metadata` - Save/Get Event Metadata
- **POST**: Save event information
- **GET**: Retrieve event information by folder name

### `/api/folder-images` - Get All Images from Folder
- **Method**: GET
- **Query**: `?folder=sarah-wedding-2024`
- **Response**: Array of image URLs

### `/api/folders` - List All Event Folders
- **Method**: GET
- **Response**: Array of folder names

### `/api/update-stats` - Update Likes/Views
- **Method**: POST
- **Body**: `{ folderName, type: 'likes'|'views', increment: boolean }`

## Pages That Use Cloudinary

### 1. Blogs Page (`/blogs`)
- Fetches folder list from localStorage (`eventFolders`)
- Loads metadata for each folder
- Displays events where `addToBlogs: true`

### 2. Blog Detail Page (`/blogs/[folderName]`)
- Loads metadata from Cloudinary
- Fetches all images from the folder
- Tracks views and likes

### 3. Recent Works (Future)
- Will load folders where `addToRecentWorks: true`

### 4. Library (Future)
- Will load folders where `addToLibrary: true`

##  Local Storage Usage

Only stores a **list of folder names** for quick access:
```javascript
localStorage.setItem('eventFolders', JSON.stringify([
  'sarah-wedding-2024',
  'john-pre-wedding',
  'portrait-session'
]))
```

**Why**: To avoid calling Cloudinary's folder listing API repeatedly (has rate limits on free tier)

## 🔒 Security Notes

1. **Admin Password**: Change `admin123` in `/src/app/admin/blogs/page.tsx`
2. **API Keys**: Never commit `.env.local` to Git (already in `.gitignore`)
3. **Production**: Implement proper authentication (JWT, sessions, etc.)

## Benefits

 **No Database Needed**: All data stored in Cloudinary  
 **Automatic Optimization**: Cloudinary optimizes images  
 **CDN Delivery**: Fast global image delivery  
 **Easy Management**: View/delete folders from Cloudinary dashboard  
 **Scalable**: Free tier includes 25GB storage + 25GB bandwidth

##  Troubleshooting

### Images not uploading?
- Check `.env.local` credentials
- Verify Cloudinary account is active
- Check browser console for errors

### Events not showing?
- Check `localStorage` for `eventFolders` array
- Verify metadata was saved in Cloudinary
- Check API responses in Network tab

### Likes/Views not updating?
- Check `/api/update-stats` endpoint
- Verify metadata file exists in Cloudinary folder

##  Development vs Production

**Current (Development)**:
- Uses localhost
- localStorage for folder tracking
- Demo password protection

**For Production**:
1. Set up proper authentication
2. Use database for folder tracking
3. Add image moderation
4. Implement rate limiting
5. Add image transformation options

---

**Need Help?** Check Cloudinary docs: https://cloudinary.com/documentation
