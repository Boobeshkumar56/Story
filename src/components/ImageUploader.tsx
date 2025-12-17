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
  const [currentFile, setCurrentFile] = React.useState(0);
  const [totalFiles, setTotalFiles] = React.useState(0);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Limit number of files
    const filesToUpload = Array.from(files).slice(0, maxFiles);

    if (multiple) {
      setTotalFiles(filesToUpload.length);
      // Upload multiple files sequentially
      for (let i = 0; i < filesToUpload.length; i++) {
        setCurrentFile(i + 1);
        const file = filesToUpload[i];
        const result = await uploadImage(file, folder);
        if (result.success && result.url) {
          onUploadComplete(result.url);
        } else if (result.error && onError) {
          onError(result.error);
        }
      }
      // Reset input and counters
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setCurrentFile(0);
      setTotalFiles(0);
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
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-black h-3 rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-600 font-medium">{Math.round(progress)}%</p>
            {multiple && totalFiles > 1 && (
              <p className="text-xs text-gray-600 font-medium">
                Image {currentFile} of {totalFiles}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}