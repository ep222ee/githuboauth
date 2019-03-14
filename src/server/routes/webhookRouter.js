'use strict'

// Requires
const router = require('express').Router()
const controller = require('../controllers/webhookController')

router.route('/payload')
  .post(controller.payloadPost)

module.exports = router
