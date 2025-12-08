import {
  startTimer,
  stopTimer,
  getStatus,
  setLimit,
} from "../services/timeService.js";
import ScreenTime from "../models/ScreenTime.js";

export const start = async (req, res) => {
  try {
    const { userId } = req.body;
    const timer = await startTimer(userId);
    res.status(200).json({ message: "Timer started", timer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const stop = async (req, res) => {
  try {
    const { userId } = req.body;
    const timer = await stopTimer(userId);
    res.status(200).json({ message: "Timer stopped", timer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const status = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await getStatus(userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const limit = async (req, res) => {
  try {
    const { userId, limitMinutes } = req.body;
    const timer = await setLimit(userId, limitMinutes);
    res.status(200).json({ message: "Limit updated", timer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// For real-time updates
export const streamStatus = async (req, res) => {
  const { userId } = req.params;

  res.set({
    "Content-Type" : "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.flushHeaders();
  res.write(`data: ${JSON.stringify({ message: "Connected", userId })}\n\n`);

  const interval = setInterval(async () => {
    const user = await ScreenTime.findOne({ userId });
    if (!user) return;

    res.write(
      `data: ${JSON.stringify({
        timeUsed: user.timeUsed,
        dailyLimit: user.dailyLimit,
        isActive: user.isActive,
      })}\n\n`
    );

    // Stop sending if the user reached their limit
    if (!user.isActive) {
      res.write(`data: ${JSON.stringify({ message: "LIMIT_REACHED" })}\n\n`);
      clearInterval(interval);
      res.end();
    }
  }, 5000); // update every 5 seconds
};
