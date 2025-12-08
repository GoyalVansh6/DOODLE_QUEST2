import mongoose from 'mongoose';

const doodleSchema = new mongoose.Schema(
  {
    // Store the Clerk User ID as a string
    childId: {
      type: String,
      required: true,
    },
    // This will be the public URL from Cloudinary
    imageUrl: {
      type: String,
      required: true,
    },
    // The name of the doodle (e.g., "sun", "moon")
    prompt: {
      type: String,
      required: false,
      trim: true,
    },
    hasReadStory:{
      type:Boolean,
      required:true,
      default: false,
    },
    hasReadQuiz:{
    type:Boolean,
    required:true,
    default: false,
    }
  },

  { timestamps: true } // Adds 'createdAt' and 'updatedAt'
);

const Doodle = mongoose.model('Doodle', doodleSchema);
export default Doodle;