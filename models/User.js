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
        required: "Password is required"
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
        showBookStatus: {
            type: Boolean,
            default: false
        },
        showBookRating: {
            type: Boolean,
            default: false
        },
        showMovieStatus: {
            type: Boolean,
            default: false
        },
        showMovieRating: {
            type: Boolean,
            default: false
        },
        showCourseStatus: {
            type: Boolean,
            default: false
        },
        showCourseRating: {
            type: Boolean,
            default: false
        },
        showEducationStatus: {
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