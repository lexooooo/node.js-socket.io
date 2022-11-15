
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {type: String, unique: false},
  name: {type: String, required: true},
  message: {type: String, required: true}
});

module.exports = mongoose.model("schema", schema);