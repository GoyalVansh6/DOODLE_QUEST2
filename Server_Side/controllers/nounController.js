import { OAuth } from 'oauth';
import dotenv from 'dotenv';
dotenv.config();

const KEY = process.env.NOUN_PROJECT_KEY;
const SECRET = process.env.NOUN_PROJECT_SECRET;

const oauth = new OAuth(
  'https://api.thenounproject.com',
  'https://api.thenounproject.com',
  KEY,
  SECRET,
  '1.0',
  null,
  'HMAC-SHA1'
);

export const getIconSuggestions = (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Query required" });

  // Limit to 5 icons as requested
  const url = `https://api.thenounproject.com/v2/icon?query=${encodeURIComponent(query)}&limit_to_public_domain=1&limit=5&thumbnail_size=200`;

  oauth.get(url, null, null, function (e, data, response) {
    if (e) {
      console.error("Noun Project Error:", e);
      return res.status(500).json({ error: "Failed to fetch icons" });
    }
    try {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON from Noun Project" });
    }
  });
};