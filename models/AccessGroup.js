const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessGroupSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  options: {
    showEmail: {
      type: Boolean,
      default: false
    },
    showPhone: {
      type: Boolean,
      default: false
    },
    showName: {
      type: Boolean,
      default: false
    },
    showDOB: {
      type: Boolean,
      default: false
    },
    showBookInfo: {
      type: Boolean,
      default: false
    },
    showMovieInfo: {
      type: Boolean,
      default: false
    },
    showMusicInfo: {
      type: Boolean,
      default: false
    },
    showCourseInfo: {
      type: Boolean,
      default: false
    },
    showEducationInfo: {
      type: Boolean,
      default: false
    },
    giveTasks: {
      type: Boolean,
      default: false
    }
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const AccessGroup = mongoose.model('AccessGroup', AccessGroupSchema);
module.exports = AccessGroup;