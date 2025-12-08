

// // async function storyimage(story) {


// // }

// // export default storyimage;

// import { GoogleGenAI } from "@google/genai";
// import * as fs from "node:fs";    
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });
// async function storyimage(story) {

  
//   // let idx = 1;

//   // for (const generatedImage of response.generatedImages) {
//   //   let imgBytes = generatedImage.image.imageBytes;
//   //   const buffer = Buffer.from(imgBytes, "base64");
//   //   fs.writeFileSync(`imagen-${idx}.png`, buffer);
//   //   idx++;
//   // }

//   const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
// // const result = await ai.models.generateImage({
// //   model: "gemini-2.0-flash",
// //   prompt: `Generate an image related to ${story}`,
// // });

// // let imageBase64 = "";
// // // to load image in parts
// //   for (const part of response.parts) {
// //     if (part.inlineData) {
// //       imageBase64 = part.inlineData.data; // Base64 string
// //     }
// //   }
// // const imageBase64 = result.image.base64;

//   const prompt =
//     `Create an image about this ${story} story`;

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash-image",
//     contents: prompt,
//   });
//   let imageBase64;
//   for (const part of response.parts) {
//     if (part.text) {
//       console.log(part.text);
//     } else if (part.inlineData) {
//       const imageData = part.inlineData.data;
//       const buffer = Buffer.from(imageData, "base64");
//       imageBase64=buffer;
//     }
//   }



// const uploadResult = await cloudinary.uploader.upload(
//   `data:image/png;base64,${imageBase64}`,
//   { folder: "gemini_stories",
//     resource_type: "image",
//    }
// );

// console.log(uploadResult.secure_url);
// return {
//     imageUrl: uploadResult.secure_url,
//   };
// }

// export default storyimage;

// import { GoogleGenerativeAI } from "@google/genai";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// async function storyimage(story) {
//   const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//   // Generate Image
//   const result = await client.generateImage({
//     model: "gemini-2.0-flash",
//     prompt: `Create an image for this story: ${story}`,
//   });

//   // Extract Base64
//   const imageBase64 = result.image.base64;

//   // Upload to cloudinary
//   const uploadResult = await cloudinary.uploader.upload(
//     `data:image/png;base64,${imageBase64}`,
//     {
//       folder: "gemini_stories",
//       resource_type: "image",
//     }
//   );

//   return {
//     imageUrl: uploadResult.secure_url,
//   };
// }

// export default storyimage;
// import { GoogleGenAI } from "@google/genai";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// async function storyimage(story) {
//   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//   const prompt = `Create an illustration image for this story: ${story}`;

//   // Generate using generateContent (old SDK style)
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash-image",
//     contents: prompt,
//   });

//   // Extract base64 image from inlineData
//   let imageBase64 = "";

//   for (const part of response.parts) {
//     if (part.inlineData) {
//       imageBase64 = part.inlineData.data; // <-- real base64 string
//     }
//   }

//   if (!imageBase64) {
//     throw new Error("No inlineData image returned by Gemini");
//   }

//   // Upload to Cloudinary
//   const uploadResult = await cloudinary.uploader.upload(
//     `data:image/png;base64,${imageBase64}`,
//     {
//       folder: "gemini_stories",
//       resource_type: "image",
//     }
//   );

//   return {
//     imageUrl: uploadResult.secure_url,
//   };
// }

// export default storyimage;
// import { InferenceClient } from "@huggingface/inference";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// const client = new InferenceClient(process.env.HF_TOKEN);
// async function storyimage(story)
// {const image = await client.textToImage({
//     provider: "together",
//     model: "stabilityai/stable-diffusion-2-1",
// 	inputs: `related to the story : ${story}`,
// 	parameters: {   guidance_scale: 7.5,
//     num_inference_steps: 30,},
// });

//   const arrayBuffer = await image.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const uploadResult = await new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder: "story_images",
//         resource_type: "image",
//         format: "png",
//       },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );

//     stream.end(buffer); // send buffer into cloudinary stream
//   });
//   return uploadResult.secure_url;

// }
// export default storyimage;

import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import axios from "axios";
import FormData from "form-data";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function storyimage(story)
{
  try{
  const payload = {
      prompt: `an image on the story : ${story}`,
      output_format: "webp",
      aspect_ratio: "1:1",
    };
const response = await axios.postForm(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: () => true,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Stability Error ${response.status}: ${response.data.toString()}`);
    }


     const base64 = Buffer.from(response.data).toString("base64");

     const uploadResult = await cloudinary.uploader.upload(
      `data:image/webp;base64,${base64}`,
      {
        folder: "story_images",
        public_id: `story_${Date.now()}`,
      }
    );
    console.log(uploadResult.secure_url)
        return uploadResult.secure_url;}
        catch(error)
        {
          console.error(error);
          console.log("error fetching image api");
        }

  }

  export default storyimage;