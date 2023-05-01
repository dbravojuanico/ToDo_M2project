const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "low",
  },
  state: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
  creator: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Task = model("Task", taskSchema);

module.exports = Task;
