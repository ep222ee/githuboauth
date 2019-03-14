'use strict'

const mongoose = require('mongoose')

let socketSchema = new mongoose.Schema({
  socketID: {
    type: String,
    required: true,
    unique: true
  },
  userID: {
    type: Number,
    required: true
  }
})

let Socket = mongoose.model('Socket', socketSchema)

module.exports = Socket
