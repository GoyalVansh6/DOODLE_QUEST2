// import multer from "multer";
// import pkg from "multer-storage-cloudinary";
// import cloudinaryModule from "cloudinary";

// const { v2: cloudinary } = cloudinaryModule;
// const { CloudinaryStorage } = pkg;

// // Cloudinary Config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Storage Config
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "doodle_uploads",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// 🔍 Debugging: Check if keys are loaded
console.log("Cloudinary Config Check:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "✅ Loaded" : "❌ Missing");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing");

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // ✅ FIXED (Was CLOUDINARY_NAME)
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage Config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "doodlequest", // Use your preferred folder name
    allowed_formats: ["png"],
    // Ensure unique filenames to avoid overwriting
    public_id: (req, file) => {
      const userId = req.auth ? req.auth.userId : 'guest';
      return `doodle_${userId}_${Date.now()}`;
    }
  },
});

const upload = multer({ storage });

export default upload;