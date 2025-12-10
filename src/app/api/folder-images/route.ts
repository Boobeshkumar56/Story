import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folderName = searchParams.get('folder');

    if (!folderName) {
      return NextResponse.json(
        { success: false, error: 'Folder name is required' },
        { status: 400 }
      );
    }

    // Fetch all resources (images) from the specified folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderName,
      max_results: 500,
      resource_type: 'image'
    });

    const images = result.resources.map((resource: any) => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      createdAt: resource.created_at
    }));

    return NextResponse.json({
      success: true,
      folder: folderName,
      images,
      count: images.length
    });
  } catch (error: any) {
    console.error('Error fetching folder images:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
