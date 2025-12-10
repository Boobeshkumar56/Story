export interface ImageData {
  id: string;
  url: string;
  title?: string;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageUploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}