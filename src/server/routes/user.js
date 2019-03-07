'use strict'

// Requires
const router = require('express').Router()

router.route('/logout')
  .post((req, res) => {
    req.logout()
    req.session.destroy((error) => {
      res.redirect('/')
    })
  })


module.exports = router
