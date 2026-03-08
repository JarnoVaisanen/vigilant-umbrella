import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model recompilation during hot reloads
const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
