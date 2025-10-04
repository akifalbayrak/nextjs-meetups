import multer from 'multer';
import { Readable } from 'stream';
import cloudinary from '../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  upload.single('image')(req, {}, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'meetups' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          Readable.from(buffer).pipe(stream);
        });
      };

      const uploadResult = await streamUpload(req.file.buffer);
      return res.status(200).json({ imageUrl: uploadResult.secure_url });
    } catch (error) {
      return res.status(500).json({ message: 'Upload failed', error: error.message });
    }
  });
}
