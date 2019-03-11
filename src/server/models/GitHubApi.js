'use strict'

const fetch = require('node-fetch')

const GitHubApi = {}

GitHubApi.getUserOrganizations = async (user) => {
  try {
    let url = `https://api.github.com/user/orgs`

    let organizations = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'token ' + user.accessToken
        }
      }).then(res => res.json())

    return organizations
  } catch (err) {
    console.log(err)
  }
  // save organizations locally/req.user.organizations...
}

GitHubApi.getOrganizationRepos = async (user, organizations) => {
  try {

let organizationRepos = []

    await organizations.forEach((organization) => {
      let repo = fetch (organization.repos_url, {
        method: 'GET',
        headers: {
          Authorization: 'token ' + user.accessToken
        }
      }).then(res => console.log(res.json()))
      // for each organizations
      // get each associated repo
      // populate array with Objects where
      /* {
            organization: orgName
            repos: [repoArray]
          }
     */
   })
   return organizationRepos
    // return organizationRepos
  } catch (err) {
    console.log(err)
  }
}

GitHubApi.setupWebhooks = async (user) => {
  console.log(user)
}

// GitHubApi.setupRepoWebhooks = async () => {}

module.exports = GitHubApi
