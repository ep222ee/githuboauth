'use strict'

const fetch = require('node-fetch')

const GitHubApi = {}

GitHubApi.getUserOrganizations = async (user) => {

    let currentUserOrgUrl = `https://api.github.com/user/orgs`

    let organizations = await fetch(currentUserOrgUrl, {
        method: 'GET',
        headers: {
          Authorization: 'token ' + user.accessToken
        }
      }).then(response => response.json())
      .catch(err => console.log(err))

    console.log(organizations)
  }

  GitHubApi.getUserRepositories = async (user) => {

      let currentUserOrgUrl = `https://api.github.com/user/repos`

      let repositories = await fetch(currentUserOrgUrl, {
          method: 'GET',
          headers: {
            Authorization: 'token ' + user.accessToken
          }
        }).then(response => response.json())
        .catch(err => console.log(err))

      console.log(repositories)
    }

module.exports = GitHubApi
