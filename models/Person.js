const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        us: String,
        ru: String,
        az: String
    },
    description: {
        us: String,
        ru: String,
        az: String
    },
    wikipediaLink: {
        us: String,
        ru: String,
        az: String
    },
    img: {
        us: String,
        ru: String,
        az: String
    },
    tags: [{_id: false, name:String, level: Number}]
})

const Person = mongoose.model("Person", PersonSchema)
module.exports = Person;