'use strict'

const GitHubApi = require('../models/GitHubApi')

const apiController = {}

apiController.getLoggedInUser = (req, res) => {
  console.log(req.user)
  let user = {}
  if (req.user) {
    user.isLoggedIn = true
  } else {
    user.isLoggedIn = false
  }
  res.status(200).json(user)
}

apiController.getUserOrganizations = (req, res) => {
  GitHubApi.test()
}


module.exports = apiController
