'use strict'

// Requires
const router = require('express').Router()
const controller = require('../controllers/settingsController')

router.route('/settings')
  .get(controller.getSettings)
  .post(controller.postSettings)


module.exports = router
