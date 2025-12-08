import mongoose from "mongoose";
import Doodle from "./Doodle.model.js";
const storySchema = new mongoose.Schema(
  {
    doodleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doodle",
      required: true,
    },
    childId: {
      type: String,
      required: true,
    },
    storyText: {
      type: String,
      required: true,
    },
    storyImage:{
      type:String,
      required:true,
    },
//     storyAudio: {
//   type: String,
//   required: true
// }

  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
