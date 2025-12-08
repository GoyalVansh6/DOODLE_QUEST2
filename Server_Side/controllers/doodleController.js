import { analyzeDoodle } from "../services/doodleServices.js";

export async function analyze(req, res) {
  try {
    const { userId, image } = req.body;
    if (!userId || !image) return res.status(400).json({ error: "Missing data" });

    const result = await analyzeDoodle(image, userId);
    res.json(result);

  } catch (err) {
    res.status(500).json({ error: "AI analysis failed", details: err.message });
  }
}
