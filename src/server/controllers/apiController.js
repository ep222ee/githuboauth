'use strict'


const GitHubApi = require('../models/GitHubApi')
const apiController = {}

apiController.getLoggedInUserState = async (req, res) => {
  try {
    let data = {}
    if (req.user) {
      let organizations = await GitHubApi.getUserOrganizations(req.user)
      let organizationsArr = []
      organizations.forEach((org) => {
        let organization = {
          id: org.id,
          name: org.login,
        }
        organizationsArr.push(organization)
      })

      let organizationRepositories = await GitHubApi.getOrganizationRepos(req.user, organizations)
      let repositoriesArr = []
      organizationRepositories.forEach((repos) => {
        repos.forEach((repo) => {
          console.log(repo)
          let repositorie = {
            id: repo.id,
            name: repo.name,
            isAdmin: repo.permissions.admin,
            hook_url: repo.hooks_url,
            organization: {
              id: repo.owner.id,
              name: repo.owner.login
            }
          }
          repositoriesArr.push(repositorie)
        })
      })

        data.loggedInUser = req.user.username
        data.avatar_url = req.user.avatar_url
        data.organizations = organizationsArr
        data.repositories = repositoriesArr
    }
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
  }
}

apiController.getUserOrganizations = async (req, res) => {
  let user = req.user
  let data = {}

  if (user) {
    data.organizations = await GitHubApi.getUserOrganizations(user)
  }

  res.status(200).json(data)
}

/* apiController.getUserLoggedInStatus = async (req, res) => {
  let loggedInStatus = req.user ? true : false
  res.status(200).json(loggedInStatus)
}*/

 /* apiController.setupWebhooks = async (req, res) => {
  console.log('webhook setup')
  // call from client when user has logged in successfully!.
  // let user = req.user
  // let repositories =  await GitHubApi.organizationRepositories(user)
  // await GitHubApi.setupWebhooks (repositories) organizations saved in req.user.organizations.
  // res.status(200)
}*/

module.exports = apiController
