const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const authDb = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).useDb("auth")
const AuthSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: "Password is required",
    select: false
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});

const Auth = authDb.model("Auth", AuthSchema);
module.exports = Auth;
