import type { NextApiRequest, NextApiResponse, NextConfig } from "next";
import multer, { MulterError } from "multer";
import { Readable } from "stream";
import cloudinary from "../../lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export const config: NextConfig = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

function streamUpload(buffer: Buffer): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "meetups" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    Readable.from(buffer).pipe(stream);
  });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  upload.single("image")(req as any, {} as any, async (err: any) => {
    if (err) {
      const message =
        err instanceof MulterError ? err.message : "Upload error";
      res.status(400).json({ message });
      return;
    }

    try {
      const file = (req as any).file as Express.Multer.File;

      if (!file || !file.buffer) {
        return res.status(400).json({ message: "No image file uploaded" });
      }

      const result = await streamUpload(file.buffer);
      res.status(200).json({ imageUrl: result.secure_url });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Upload failed", error: error.message || error });
    }
  });
}
