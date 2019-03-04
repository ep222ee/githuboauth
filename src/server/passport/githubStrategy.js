'use strict'

const GithubStrategy = require('passport-github').Strategy

require('dotenv').config()

const githubOptions = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}

module.exports = new GithubStrategy(githubOptions, (accessToken, refreshToken, profile, cb) => {
  // user find or create
  console.log(accessToken)
  console.log(profile)
//  console.log(refreshToken)
  return cb(null, profile)
})
