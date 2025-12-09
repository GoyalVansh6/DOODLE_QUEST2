import ScreenTime from "../models/ScreenTime.js";

let activeTimers = {};

export const startTimer = async (userId) => {
  let record = await ScreenTime.findOne({ userId });
  if (!record) record = await ScreenTime.create({ userId });

  // Prevent multiple intervals
  if (record.isActive) {
    console.log("⛔ Timer already active — NOT starting again");
    return record;
  }

  if (activeTimers[userId]) {
    console.log("⛔ Interval already running — NOT creating again");
    return record;
  }

  // Activate user
  record.isActive = true;
  record.lastStartTime = new Date();
  await record.save();

  // Create ONE interval
  activeTimers[userId] = setInterval(async () => {
    const updated = await ScreenTime.findOne({ userId });

    // Stop if inactive
    if (!updated.isActive) {
      clearInterval(activeTimers[userId]);
      delete activeTimers[userId];
      return;
    }

    updated.timeUsed += 1;
    console.log(`${userId} used ${updated.timeUsed} mins`);

    // Stop at limit
    if (updated.timeUsed >= updated.dailyLimit) {
      updated.isActive = false;
      await updated.save();

      clearInterval(activeTimers[userId]);
      delete activeTimers[userId];

      console.log(`⛔ User ${userId} reached DAILY LIMIT`);
    } else {
      await updated.save();
    }

  }, 60000);

  return record;
};

export const stopTimer = async (userId) => {
  const record = await ScreenTime.findOne({ userId });
  if (!record) throw new Error("User not found");

  record.isActive = false;
  await record.save();

  if (activeTimers[userId]) {
    clearInterval(activeTimers[userId]);
    delete activeTimers[userId];
  }

  return record;
};

export const getStatus = async (userId) => {
  let record = await ScreenTime.findOne({ userId });
  if (!userId || userId === "undefined" || userId === "null") {
     throw new Error("Invalid User ID");
  }
  if (!record) {
    record = await ScreenTime.create({
      userId,
      timeUsed: 0,
      dailyLimit: 60,
      isActive: false
    });
    const record = await ScreenTime.findOneAndUpdate(
    { userId }, 
    { $setOnInsert: { timeUsed: 0, dailyLimit: 60, isActive: false } },
    { new: true, upsert: true } 
  );
  }

  return record;
};

export const setLimit = async (userId, limitMinutes) => {
  const record = await ScreenTime.findOneAndUpdate(
    { userId },
    { dailyLimit: limitMinutes },
    { new: true, upsert: true }
  );
  return record;
};
