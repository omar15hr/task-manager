import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  listId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "List", 
    required: true 
  },
});

export const Task = mongoose.model("Task", taskSchema);
