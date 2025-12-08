import CameraPermission from "../models/CameraPermission.js";

export async function getCameraPermission(userId) {
  let record = await CameraPermission.findOne({ userId });
  if (!record)
    record = await CameraPermission.create({ userId, cameraAllowed: false });
  return record;
}

export async function setCameraPermission(userId, allowed) {
  let record = await CameraPermission.findOne({ userId });
  if (!record)
    record = await CameraPermission.create({ userId, cameraAllowed: allowed });

  record.cameraAllowed = allowed;
  await record.save();
  return record;
}
