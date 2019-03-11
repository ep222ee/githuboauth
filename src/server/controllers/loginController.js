'use strict'

const GitHubApi = require('../models/GitHubApi')
const loginController = {}

loginController.logoutPost = (req, res) => {
  // set logout time for old/new event comparisons?..
  req.logout()
  req.session.destroy((error) => {
    res.redirect('/')
  })
}


loginController.oauthLogin = (req, res) => {
  console.log('oauthLogin')
  res.redirect('/')
}

module.exports = loginController
