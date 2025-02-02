const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    partialFilterExpression:{username:{$type:"string"}}
  },
  accountType: {
    type: String,
    default: 'private'
  },
  firstname: String,
  lastname: String,
  description: String,
  country: String,
  city: String,
  dob: Date,
  phoneNumber: String,
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: 'user'
  },
  emotion: { type: String, default: 'neutral' },
  tags: {},
  generalAccessOptions: {
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
  verified: {
    email: {
      default: null,
      type: String
    }
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
