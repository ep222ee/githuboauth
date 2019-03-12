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


loginController.oauthLogin = async (req, res) => {
  // prefer ajax call to not block initial redirect.
  // move to ajax for faster initial load..
  let user = req.user
  let userOrganizations = await GitHubApi.getUserOrganizations(user)
  let organizationRepositories = await GitHubApi.getOrganizationRepos(user, userOrganizations)
  GitHubApi.setupWebhooks(organizationRepositories)
  res.redirect('/')
}

module.exports = loginController
