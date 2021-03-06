'use strict'

const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  githubID: {
    type: String,
    required: true,
    unique: true
  },
  lastLoggedIn: {
    type: Number,
    required: true
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
