import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadAudioStreamToCloudinary = (buffer, folder = "audio") => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",   
        folder: folder,
        format: "wav"            
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    );


    streamifier.createReadStream(buffer).pipe(upload);
  });
};

export default uploadAudioStreamToCloudinary;