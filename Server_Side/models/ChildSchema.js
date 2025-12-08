// models/Child.js
// Child document: used for authentication (childId + hashed password).
// Reason: separate collection for fast lookup and secure password storage.

import mongoose from "mongoose";

const childSchema = new mongoose.Schema(
  {
    childId: { type: String, required: true, unique: true },
    childPassword: { type: String, required: true }, // hashed
    parentClerkId: { type: String, required: true }, // link back to parent
  },
  { timestamps: true }
);

export default mongoose.model("Child", childSchema);
