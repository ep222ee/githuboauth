'use strict'


const GitHubApi = require('../models/GitHubApi')
const apiController = {}

apiController.getLoggedInUser = async (req, res) => {
  let data = {}
  if (req.user) {
    data.loggedInUser = req.user.username
    data.avatar_url = req.user.avatar_url
  }
  res.status(200).json(data)
}

apiController.getUserOrganizations = async (req, res) => {
  let user = req.user
  let data = {}

  if (user) {
    data.organizations = await GitHubApi.getUserOrganizations(user)
  }

  res.status(200).json(data)
}

apiController.setupWebhooks = async (req, res) => {
  // call from client when user has logged in successfully!.
  // let user = req.user
  // let repositories =  await GitHubApi.organizationRepositories(user)
  // await GitHubApi.setupWebhooks (repositories) organizations saved in req.user.organizations.
  // res.status(200)
}

module.exports = apiController
