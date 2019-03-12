'use strict'

// Requires
const router = require('express').Router()
const controller = require('../controllers/apiController')

router.route('/api/loggedInUser')
  .get(controller.getLoggedInUser)

router.route('/api/userOrganizations')
  .get(controller.getUserOrganizations)

/* router.route('/api/hookSetup')
  .post(controller.setupWebhooks) */


module.exports = router
