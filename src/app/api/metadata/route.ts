import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();

    const {
      folderName,
      title,
      excerpt,
      description,
      category,
      date,
      location,
      eventDate,
      coverImage,
      addToRecentWorks,
      addToLibrary,
      addToBlogs
    } = eventData;

    // Save metadata as a JSON file in the folder
    const metadata = {
      title,
      excerpt,
      description,
      category,
      date,
      location,
      eventDate,
      coverImage,
      addToRecentWorks,
      addToLibrary,
      addToBlogs,
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString()
    };

    // Upload metadata as a text file to Cloudinary (not raw, use text format)
    const metadataString = JSON.stringify(metadata, null, 2);
    const dataURI = `data:text/plain;base64,${Buffer.from(metadataString).toString('base64')}`;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: folderName,
      public_id: 'metadata.json',
      resource_type: 'raw',
      type: 'upload',
      overwrite: true,
      invalidate: true
    });

    console.log('Metadata uploaded successfully!');
    console.log('Public ID:', uploadResult.public_id);
    console.log('Secure URL:', uploadResult.secure_url);

    return NextResponse.json({
      success: true,
      message: 'Event metadata saved successfully',
      folder: folderName,
      metadataUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id
    });
  } catch (error: any) {
    console.error('Error saving metadata:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save metadata' },
      { status: 500 }
    );
  }
}

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

    try {
      // The file is uploaded as raw type, so we need to fetch it directly by URL
      // First, try to get the resource info to get the secure URL
      const publicId = `${folderName}/metadata.json`;
      
      // Try different approaches to fetch the metadata
      let metadataUrl;
      
      try {
        // Attempt 1: Try as raw resource with .json extension
        const result = await cloudinary.api.resource(publicId, {
          resource_type: 'raw',
          type: 'upload'
        });
        metadataUrl = result.secure_url;
        console.log('Metadata resource found via API:', metadataUrl);
      } catch (rawError) {
        console.log('API lookup failed, constructing URL directly');
        // Attempt 2: Construct URL directly using Cloudinary cloud name
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        metadataUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/${folderName}/metadata.json`;
      }

      console.log('Attempting to fetch metadata from:', metadataUrl);

      // Fetch the actual JSON content from the URL
      const response = await fetch(metadataUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch metadata file: ${response.statusText}`);
      }
      
      const metadata = await response.json();

      return NextResponse.json({
        success: true,
        metadata
      });
    } catch (fetchError: any) {
      console.error('Error fetching metadata from Cloudinary:', fetchError);
      
      // If metadata doesn't exist, return a not found error
      if (fetchError.error?.http_code === 404 || fetchError.message?.includes('404')) {
        return NextResponse.json(
          { success: false, error: 'Event metadata not found. Please upload this event from admin panel.' },
          { status: 404 }
        );
      }
      
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}
