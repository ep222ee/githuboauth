'use strict'

const fetch = require('node-fetch')

const GitHubApi = {}

GitHubApi.getUserOrganizations = async (user) => {
  try {
    let currentUserOrgUrl = `https://api.github.com/user/orgs`

    let organizations = await fetch(currentUserOrgUrl, {
        method: 'GET',
        headers: {
          Authorization: 'token ' + user.accessToken
        }
      }).then(res => res.json())

    return organizations
  } catch (err) {
    console.log(err)
  }
}

GitHubApi.getOrganizationRepos = async (organizations) => {
  try {

let organizationRepos = []

    organizations.forEach(async (organization) => {
      console.log(organization)
      // for each organizations
      // get each associated repo
      // populate array with Objects where
      /* {
            organization: orgName
            repos: [repoArray]
          }
     */
   })
    // return organizationRepos
  } catch (err) {
    console.log(err)
  }
}

// GitHubApi.setupRepoWebhooks = async () => {}

module.exports = GitHubApi
