import multer from 'multer';
import { MongoClient } from 'mongodb';
import { Readable } from 'stream';
import cloudinary from '../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  upload.single('image')(req, {}, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Multer error', error: err.message });
    }

    try {
      const { title, address, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Cloudinary upload
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
      const imageUrl = uploadResult.secure_url;

      // MongoDB connection
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();
      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne({
        title,
        address,
        description,
        image: imageUrl,
      });

      client.close();

      res.status(201).json({ message: 'Meetup created', id: result.insertedId, imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  });
};
