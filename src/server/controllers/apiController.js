'use strict'


const GitHubApi = require('../models/GitHubApi')
const apiController = {}

apiController.getLoggedInUser = async (req, res) => {
  let user = {}
  if (req.user) {
    user.isLoggedIn = true
  } else {
    user.isLoggedIn = false
  }
  res.status(200).json(req.user)
}

apiController.getUserOrganizations = async (req, res) => {
  let user = req.user
  let organizations = await GitHubApi.getUserOrganizations(user)
  res.status(200).json(organizations)
}

apiController.setupWebhooks = async (req, res) => {
  // call from client when user has logged in successfully!.
  // let user = req.user
  // let repositories =  await GitHubApi.organizationRepositories(user)
  // await GitHubApi.setupWebhooks (repositories) organizations saved in req.user.organizations.
  // res.status(200)
}

module.exports = apiController
