'use strict'

const mongoose = require('mongoose')

let webhookSchema = new mongoose.Schema({
  repoID: {
    type: Number,
    required: true
  },
  userID: {
    type: Number,
    required: true
  }
})

let Webhook = mongoose.model('Webhook', webhookSchema)

module.exports = Webhook
