import { getCameraPermission, setCameraPermission } from "../services/cameraServies.js";

export async function fetchPermission(req, res) {
  try {
    const { userId } = req.params;
    const record = await getCameraPermission(userId);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePermission(req, res) {
  try {
    const { userId, allowed } = req.body;
    const record = await setCameraPermission(userId, allowed);
    res.json({ success: true, record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
