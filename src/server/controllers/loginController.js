'use strict'

const GitHubApi = require('../models/GitHubApi')
const loginController = {}

loginController.logoutPost = (req, res) => {
  req.logout()
  req.session.destroy((error) => {
    res.redirect('/')
  })
}


loginController.oauthLogin = (req, res) => {
  res.redirect('/')
}

module.exports = loginController
