const mongoose = require('mongoose')
const Student = require('./Student')

const schema = new mongoose.Schema({

  code: {
    type: String,
    require: true,
    minlength: 1,
    maxLength: 16
  },
  title: {
    type: String,
    require: true,
    minlength: 1,
    maxLength: 255
  },
  description: {
    type: String,
    require: false,
    maxLength: 2048
  },
  url: {
    type: String,
    require: false,
    maxLength: 512
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    ref: "Student"
  }]

})