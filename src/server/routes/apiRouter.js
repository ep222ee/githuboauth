'use strict'

// Requires
const router = require('express').Router()
const controller = require('../controllers/apiController')

router.route('/api/loggedInUser')
  .get(controller.getLoggedInUser)


module.exports = router
