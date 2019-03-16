'use strict'

const mongoose = require('mongoose')

let subscriberSchema = new mongoose.Schema({
  subscription: {
    type: Object,
    required: true,
    unique: true
  },
  userID: {
    type: Number,
    required: true
  }
})

let Subscriber = mongoose.model('Subscriber', subscriberSchema)

module.exports = Subscriber
