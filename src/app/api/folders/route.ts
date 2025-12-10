import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Get all root folders in Cloudinary
    const result = await cloudinary.api.root_folders();
    
    const folders = result.folders || [];
    const folderList = folders.map((folder: any) => folder.name);
    
    return NextResponse.json({
      success: true,
      folders: folderList,
      count: folderList.length
    });
  } catch (error: any) {
    console.error('Error fetching folders:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch folders' },
      { status: 500 }
    );
  }
}
