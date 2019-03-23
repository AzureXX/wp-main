const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    en: String,
    ru: String,
    az: String
  },
  description: {
    en: String,
    ru: String,
    az: String
  },
  wikipediaLink: {
    en: String
  }
})

const Person = mongoose.model("Person", PersonSchema)
module.exports = Person;