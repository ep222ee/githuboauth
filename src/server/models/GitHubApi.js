'use strict'

const fetch = require('node-fetch')

const GitHubApi = {}

GitHubApi.getUserOrganizations = async (user) => {
  try {
    let url = `https://api.github.com/user/orgs`

    let userOrganizations = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'token ' + user.accessToken
        }
      }).then(res => res.json())

    return userOrganizations
  } catch (err) {
    console.log(err)
  }
}

GitHubApi.getOrganizationRepos = async (user, userOrganizations) => {
  try {

      let organizationRepos = []

      await userOrganizations.forEach((organization) => {
        organizationRepos.push(fetch (organization.repos_url, {
          method: 'GET',
          headers: {
            Authorization: 'token ' + user.accessToken
          }
        }).then(res => res.json()))
     })
     let result = await Promise.all(organizationRepos)
     return result
  } catch (err) {
    console.log(err)
  }
}

GitHubApi.setupWebhooks = async (organizationRepositories) => {
  try {
      organizationRepositories.forEach((repos) => {
      repos.forEach((repo) => {
        // console.log(repo.owner)
        if (repo.permissions.admin) {
          // console.log('setup webhook!')
          // setup webhook for each admin repo..
        }
      })
    })
  } catch (err) {
    console.log(err)
  }

}

module.exports = GitHubApi
