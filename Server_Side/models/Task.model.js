import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    // Who is this task for?
    childId: {
      type: String,
      required: true,
    },
    // Who assigned it? (Optional)
    parentId: {
      type: String,
      required: false, 
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    // Appreciation message from parent
    appreciationMessage: {
      type: String,
      default: '',
    },
    dueDate: {
      type: Date,
    },
    taskImage: { type: String }, 
},
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;