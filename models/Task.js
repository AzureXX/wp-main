const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: String,
  item: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'type'
  },
  level: String,
  comment: String,
  deadline: Date,
  status: {type:String, default: "new"}
})

const Task = mongoose.model("Task", TaskSchema)
module.exports = Task;