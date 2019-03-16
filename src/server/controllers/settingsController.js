'use strict'

const Setting = require('../models/SettingSchema')

const settingsController = {}

settingsController.getSettings = (req, res) => {
  console.log('get settings')
}


settingsController.postSettings = (req, res) => {
  console.log('post settings')
}

module.exports = settingsController
