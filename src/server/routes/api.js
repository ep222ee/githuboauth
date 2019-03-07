'use strict'

// Requires
const router = require('express').Router()

router.route('/api/loggedInUser')
  .get((req, res) => {
    console.log(req.user)
    let user = {}
    if (req.user) {
      user.isLoggedIn = true
    } else {
      user.isLoggedIn = false
    }
    res.json(user)
    res.status(200)
  })


module.exports = router
