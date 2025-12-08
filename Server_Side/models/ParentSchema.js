// models/Parent.js
// Parent document: stores Clerk identity + a single childId linkage.
// Reason: Clerk holds parent auth (email/password/session). We store minimal mapping
// to identify which child belongs to this parent. One child per parent (as requested).

import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true }, // Clerk identity
    parentId: { type: String, required: true, unique: true },    // friendly username
    parentEmail: { type: String, required: true, unique: true },
    parentMobile: { type: String },
    childId: { type: String, required: true }, // single child ID (your requirement)
  },
  { timestamps: true }
);

export default mongoose.model("Parent", parentSchema);
