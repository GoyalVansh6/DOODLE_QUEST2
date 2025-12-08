// import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
// import { Readable } from 'stream';
// import dotenv from "dotenv";
// async function audioService(story)
// {
   

// dotenv.config();


//   // Initialize ElevenLabs client (API key auto-picked from environment if set)
//   const elevenlabs = new ElevenLabsClient();

//   // Generate audio from text
//   const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
//     text: `${story}`,
//     modelId: 'eleven_multilingual_v2',
//     outputFormat: 'mp3_44100_128',
//   });

//   // Convert the returned audio into a readable stream
//   const reader = audio.getReader();
//   const stream = new Readable({
//     async read() {
//       const { done, value } = await reader.read();
//       if (done) {
//         this.push(null);
//       } else {
//         this.push(value);
//       }
//     },
//   });

//   // Play the generated stream
//   return stream;


// }

// export default audioService;
import { GoogleGenAI } from "@google/genai";
import { Readable } from "stream";
import wav from "wav";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

// Helper to create WAV buffer
async function saveWaveBuffer(pcmData, channels = 1, rate = 24000, sampleWidth = 2) {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const chunks = [];

    writer.on("data", (chunk) => chunks.push(chunk));
    writer.on("finish", () => resolve(Buffer.concat(chunks)));
    writer.on("error", reject);

    writer.end(pcmData);
  });
}

async function audioService(story) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: story }] }],
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: "Kore" },
        },
      },
    },
  });

  // Extract base64 audio
  const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  const pcmBuffer = Buffer.from(data, "base64");


  //To save audio file
  // const outputPath = path.join(process.cwd(), "welcome.mp3");
  // fs.writeFileSync(outputPath, pcmBuffer);

  // Convert PCM → WAV buffer
  const wavBuffer = await saveWaveBuffer(pcmBuffer);

  // Return readable stream like ElevenLabs
  const stream = Readable.from(wavBuffer);

  const outputPath = path.join(process.cwd(), "intro1.wav");
fs.writeFileSync(outputPath, wavBuffer);
  return stream;
}

export default audioService;
