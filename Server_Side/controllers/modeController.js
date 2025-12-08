// temporary storage — later will be database
let modeStatus = {};

export const setMode = (req, res) => {
  const { userId, mode } = req.body;
  if (!userId || !mode) {
    return res.status(400).json({ success: false, error: "userId and mode required" });
  }

  modeStatus[userId] = { mode, startTime: Date.now() };
  res.json({ success: true, message: `${mode} mode activated` });
};

export const getMode = (req, res) => {
  const { userId } = req.params;
  const userMode = modeStatus[userId] || { mode: "none" };
  res.json(userMode);
};
