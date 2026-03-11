import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const result = await cloudinary.api.root_folders();
    const folders: string[] = (result.folders || []).map((f: any) => f.name);

    if (folders.length === 0) {
      return NextResponse.json(
        { success: true, events: [] },
        { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
      );
    }

    const events = await Promise.all(
      folders.map(async (folderName: string) => {
        try {
          // Construct URL directly — no cloudinary.api.resource lookup needed
          const metadataUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/${folderName}/metadata.json`;
          const metaRes = await fetch(metadataUrl, { next: { revalidate: 60 } });
          if (!metaRes.ok) return null;
          const metadata = await metaRes.json();

          // Use stored coverImage, or fetch just 1 image as fallback
          let coverImage: string | null = metadata.coverImage || null;
          if (!coverImage) {
            const imagesResult = await cloudinary.api.resources({
              type: 'upload',
              prefix: folderName,
              max_results: 10,
              resource_type: 'image',
            });
            const firstValid = imagesResult.resources.find(
              (r: any) => !r.public_id.includes('metadata')
            );
            if (firstValid) coverImage = firstValid.secure_url;
          }

          return { folderName, metadata, coverImage };
        } catch {
          return null;
        }
      })
    );

    const valid = events.filter(Boolean);

    return NextResponse.json(
      { success: true, events: valid },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch event summaries' },
      { status: 500 }
    );
  }
}
