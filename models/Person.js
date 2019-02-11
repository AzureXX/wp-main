const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    en: String,
    ru: String,
    az: String
  },
})

const Person = mongoose.model("Person", PersonSchema)
module.exports = Person;