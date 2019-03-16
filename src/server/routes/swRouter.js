'use strict'

// Requires
const router = require('express').Router()
const controller = require('../controllers/swController')

router.route('/subscribe')
  .post(controller.subscribeSW)

module.exports = router
