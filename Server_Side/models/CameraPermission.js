import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  cameraAllowed: { type: Boolean, default: false }
});

export default mongoose.model("CameraPermission", cameraSchema);
