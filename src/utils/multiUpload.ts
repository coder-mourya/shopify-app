import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'config/cloudinary';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'content-images'; // Default folder

    let resourceType: 'image' | 'raw' | 'video' = 'image';

    // Check file type and set appropriate folder
    if (file.mimetype === 'application/pdf') {
      folder = 'content-files'; // Store PDFs in a different folder
      resourceType = 'raw';
    } else if (file.mimetype.startsWith('video/')) {
      folder = 'content-videos';
      resourceType = 'video';
    }

    return {
      folder,
      allowed_formats: ['jpeg', 'png', 'jpg', 'pdf', 'mp4', 'mov', 'avi'], // Allowed file types
      resource_type: resourceType, // PDFs need 'raw' type
    };
  }
});


// Set up multer with Cloudinary storage and file size limit
const multiUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // allow larger size for videos
}).fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]);

export default multiUpload;
