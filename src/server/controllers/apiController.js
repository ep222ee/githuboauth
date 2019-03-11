'use strict'

// Github Api Wrapper
const GitHubApi = require('../models/GitHubApi')

const apiController = {}

apiController.getLoggedInUser = (req, res) => {
  let user = {}
  if (req.user) {
    user.isLoggedIn = true
  } else {
    user.isLoggedIn = false
  }
  res.status(200).json(user)
}

apiController.getUserOrganizations = async (req, res) => {
  let user = req.user
  let organizations = await GitHubApi.getUserOrganizations(user)
  //let repositories = GitHubApi.getOrganizationRepos(organizations)
  res.status(200).json(organizations)
}


module.exports = apiController
