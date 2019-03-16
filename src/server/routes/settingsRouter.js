'use strict'

// Requires
const router = require('express').Router()
const controller = require('../controllers/settingsController')

router.route('/settings')
  .post(controller.postSettings)


module.exports = router
