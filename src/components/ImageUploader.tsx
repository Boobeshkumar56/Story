import React, { useRef } from 'react';
import { useImageUpload } from '../hooks/useImageUpload';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  onError?: (error: string) => void;
  folder?: string;
  className?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export default function ImageUploader({ 
  onUploadComplete, 
  onError, 
  folder,
  className = '',
  multiple = false,
  maxFiles = 8
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading, progress } = useImageUpload();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Limit number of files
    const filesToUpload = Array.from(files).slice(0, maxFiles);

    if (multiple) {
      // Upload multiple files sequentially
      for (const file of filesToUpload) {
        const result = await uploadImage(file, folder);
        if (result.success && result.url) {
          onUploadComplete(result.url);
        } else if (result.error && onError) {
          onError(result.error);
        }
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      // Single file upload
      const result = await uploadImage(filesToUpload[0], folder);
      if (result.success && result.url) {
        onUploadComplete(result.url);
      } else if (result.error && onError) {
        onError(result.error);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        disabled={isUploading}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 
                   disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isUploading ? 'Uploading...' : multiple ? 'Select Images (up to 8)' : 'Upload Image'}
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {isUploading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}