const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
    },
    password: {
        type: String,
        required: "Password is required",
        select: false
    },
    accountType: {
        type: String,
        default: "private"
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
        default: "user"
    },
    emotion: {type: String, default: "neutral"},
    tags: [{_id: false, name:String, level: Number}],
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
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User;