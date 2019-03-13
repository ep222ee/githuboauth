'use strict'

// Requires
const router = require('express').Router()
const controller = require('../controllers/apiController')

router.route('/api/loggedInUserState')
  .get(controller.getLoggedInUserState)

router.route('/api/userOrganizations')
  .get(controller.getUserOrganizations)

/* router.route('/api/isLoggedIn')
    .get(controller.getUserLoggedInStatus) */

/* router.route('/api/hookSetup')
  .post(controller.setupWebhooks) */


module.exports = router
