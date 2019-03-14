'use strict'
require('dotenv').config()
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

GitHubApi.setupWebhooks = async (user, repositories) => {

  await repositories.forEach((repo) => {

      let hookOptions = {
          name: 'web',
          active: true,
          events: ['issue_comment', 'push', 'issues', 'release'],
          config: {
            url: `${process.env.HOOK_CALLBACK_URL}`,
            content_type: 'json',
            insecure_ssl: '1'
          }
        }

      fetch (repo.hook_url, {
        method: 'POST',
        headers: {
          Authorization: 'token ' + user.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hookOptions)
      }).then(setHookResponse => setHookResponse.json())
      .then(setHookResponseData => {
        console.log(setHookResponseData)
      })
  })
}


module.exports = GitHubApi
