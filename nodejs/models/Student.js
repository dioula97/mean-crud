const mongoose = require('mongoose');

var Student = mongoose.model('Student',{
  id: String,
  name: String,
  office: String,
  bourse: Number
});

module.exports = { Student }