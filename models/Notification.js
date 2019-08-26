const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  text: {
    us: String,
    ru: String,
    az: String
  },
  date: Date
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
