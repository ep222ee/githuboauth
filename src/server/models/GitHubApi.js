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
    if (repo.isAdmin) {

      // fetch (repo.hook_url, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'token ' + user.accessToken,
      //
      //   }
      // }).then(res => res.json())
      // .then(data => {
      //   console.log(data)
      //   let events = []
      //   if (data[0]) {
      //     events = data[0].events
      //   }
      //   console.log(events)
      //   let eventsToSet = []
      //
      //   if(!events.includes('issue_comment')) {
      //     eventsToSet.push('issue_comment')
      //   }
      //
      //   if(!events.includes('push')) {
      //     eventsToSet.push('push')
      //   }
      //
      //   if (eventsToSet.length > 0) {
      //     // set insecure_ssl to 0 when not using self-signed.
      //
      //   }
      //
      //
      // })
      let hookOptions = {
          name: 'web',
          active: true,
          events: ['issue_comment', 'push'],
          config: {
            url: 'https://localhost:3000/webhooks',
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


    }
  })
}


module.exports = GitHubApi
