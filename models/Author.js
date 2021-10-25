const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  fullName: String,
  academicLevel: String,
  age: Number
});

module.exports= mongoose.model('Authors', AuthorSchema);
