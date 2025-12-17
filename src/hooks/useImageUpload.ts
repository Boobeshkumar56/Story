import { useState } from 'react';

interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file: File, folder?: string): Promise<UploadResponse> => {
    return new Promise((resolve) => {
      setIsUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append('file', file);
      if (folder) {
        formData.append('folder', folder);
      }

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(percentComplete);
        }
      });

      // Handle completion
      xhr.addEventListener('load', () => {
        setIsUploading(false);
        
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            setProgress(100);
            resolve({ success: true, url: data.url });
          } catch (error) {
            resolve({ success: false, error: 'Invalid response from server' });
          }
        } else {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve({ success: false, error: data.error || 'Upload failed' });
          } catch {
            resolve({ success: false, error: 'Upload failed' });
          }
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        setIsUploading(false);
        resolve({ success: false, error: 'Network error occurred' });
      });

      // Handle abort
      xhr.addEventListener('abort', () => {
        setIsUploading(false);
        resolve({ success: false, error: 'Upload cancelled' });
      });

      // Send request
      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    });
  };

  return {
    uploadImage,
    isUploading,
    progress
  };
}