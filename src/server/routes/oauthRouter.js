'use strict'

// Requires
const router = require('express').Router()

router.route('/')
  .get((req, res) => {
    console.log(req.session)
    console.log('root')
    res.status(200)
  })


module.exports = router
