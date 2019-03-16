'use strict'

const Webhook = require('../models/WebhookSchema')
const Setting = require('../models/SettingSchema')
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

      for (let i = 0; i < organizationRepositories.length; i++) {
        let repos = organizationRepositories[i]
        for (let j = 0; j < repos.length; j++) {
          let repo = repos[j]
          let repository = {
            id: repo.id,
            name: repo.name,
            isAdmin: repo.permissions.admin,
            hook_url: repo.hooks_url,
            organization: {
              id: repo.owner.id,
              name: repo.owner.login
            }
          }
          if (repository.isAdmin) {
            repository.settings = []
            let repoSettings = await Setting.find({userID: req.user.id, repoID: repo.id}, (err, settings) => {
              if (err) {
                console.log(err)
              }
              settings.forEach((setting) => {
                repository.settings.push({
                  eventType: setting.eventType,
                  eventID: setting._id,
                  isSet: true
                })
              })
            })
          }
          repositoriesArr.push(repository)
        }
      }

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

apiController.getUserLoggedInStatus = async (req, res) => {
  let loggedInStatus = req.user ? true : false
  res.status(200).json(loggedInStatus)
}

apiController.setupWebhooks = async (req, res) => {
  try {
    let user = req.user
    let repositories = req.body
    // only keep admin repositories
    repositories = repositories.filter((repo) => {
      return repo.isAdmin
    })
    // get repositories with set up webhooks
    let savedWebhooks = await Webhook.find({userID: user.id}, 'repoID', (err, data) => {
      if (err) console.log(err)
      return data
    })
    // only keep repositories without webhooks
    repositories = repositories.filter((repo) => {
      let hookExists = false
      savedWebhooks.forEach((hook) => {
        if (hook.repoID === repo.id) {
          hookExists = true
        }
      })
      return !hookExists
    })
    // if repositories exists without set up webhooks
    if (repositories.length > 0) {
      GitHubApi.setupWebhooks(user, repositories)

      repositories.forEach((repo) => {
        let webhook = new Webhook({
          userID: user.id,
          repoID: repo.id,
        })

        webhook.save((err, hook) => {
          if (err) {
            console.log(err)
          }
        })
      })
    }
    res.status(200).json()
  } catch (err) {
    console.log(err)
  }
}

module.exports = apiController
