'use strict'

const GitHubApi = require('../models/GitHubApi')

const loginController = {}

loginController.logoutPost = async (req, res) => {
  req.logout()
  req.session.destroy((error) => {
    res.redirect('/')
  })
}


loginController.oauthLogin = async (req, res) => {
  console.log('här är vi')
  // set up webhooks for a users repos..
  // setup socket..
  // setup service worker..
  res.redirect('/')
}

module.exports = loginController
