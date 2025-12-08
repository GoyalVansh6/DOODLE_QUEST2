import audioService from "../services/audioservice.js";

async function Generateaudio(req, res) {
  try {
    const stream = await audioService(req.query.story);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "inline; filename=story.mp3",
    });

    stream.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate audio" });
  }
}

export default Generateaudio;