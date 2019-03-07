'use strict'

// Requires
const router = require('express').Router()
const controller = require('../controllers/loginController')

router.route('/logout')
  .post(controller.logoutPost)

module.exports = router
