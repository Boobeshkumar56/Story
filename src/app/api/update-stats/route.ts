import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { folderName, type, increment } = await request.json();

    if (!folderName || !type) {
      return NextResponse.json(
        { success: false, error: 'Folder name and type are required' },
        { status: 400 }
      );
    }

    // Fetch current metadata (with .json extension)
    let metadataUrl;
    let metadata;

    try {
      // Try to get the resource from Cloudinary API
      const result = await cloudinary.api.resource(`${folderName}/metadata.json`, {
        resource_type: 'raw',
        type: 'upload'
      });
      metadataUrl = result.secure_url;
    } catch (apiError) {
      // If API fails, construct URL directly
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      metadataUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/${folderName}/metadata.json`;
    }

    // Fetch the current metadata content
    const response = await fetch(metadataUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    
    metadata = await response.json();

    // Update the count
    if (type === 'likes') {
      metadata.likes = (metadata.likes || 0) + (increment ? 1 : -1);
    } else if (type === 'views') {
      metadata.views = (metadata.views || 0) + 1;
    }

    // Save updated metadata with .json extension
    const metadataString = JSON.stringify(metadata, null, 2);
    const dataURI = `data:text/plain;base64,${Buffer.from(metadataString).toString('base64')}`;

    await cloudinary.uploader.upload(dataURI, {
      folder: folderName,
      public_id: 'metadata.json',
      resource_type: 'raw',
      type: 'upload',
      overwrite: true,
      invalidate: true
    });

    return NextResponse.json({
      success: true,
      [type]: metadata[type]
    });
  } catch (error: any) {
    console.error('Error updating stats:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update stats' },
      { status: 500 }
    );
  }
}
