'use strict'

const mongoose = require('mongoose')

let settingSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  repoID: {
    type: Number,
    required: true
  },
  eventType: {
    type: String,
    required: true
  }
})

let Setting = mongoose.model('Setting', settingSchema)

module.exports = Setting
