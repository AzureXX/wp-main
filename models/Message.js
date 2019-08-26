const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: "000000000000000000000000" },
  text: {
    us: String,
    ru: String,
    az: String
  },
  date: Date
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
