import mongoose from "mongoose";

const screenTimeSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
    unique: true,
  },
  timeUsed: {
    type: Number,
    default: 0, // in minutes
  },
  dailyLimit: {
    type: Number,
    default: 60, // default limit (1 hour)
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  lastStartTime: {
    type: Date,
  },
});

export default mongoose.model("ScreenTime", screenTimeSchema);
