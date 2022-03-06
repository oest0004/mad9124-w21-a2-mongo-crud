const mongoose = require('mongoose')

const schema = new mongoose.Schema({

  firstName: {
    type: String,
    require: true,
    maxLength: 64
  },
  lastName: {
    type: String,
    require: true,
    maxLength: 64
  },
  nickName: {
    type: String,
    require: false,
    maxLength: 64
  },
  email: {
    type: String,
    require: true,
    maxLength: 512
  }
})

const Model = mongoose.model("Student",schema)

module.exports = Model