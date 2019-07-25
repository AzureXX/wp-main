const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'type',
    required: true
  },
  level: String,
  comment: String,
  deadline: Date,
  status: {type:String, default: "new"},
  archived: {type: Boolean, default: false} 
})

const Task = mongoose.model("Task", TaskSchema)
module.exports = Task;