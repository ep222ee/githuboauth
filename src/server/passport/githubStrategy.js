'use strict'

const GithubStrategy = require('passport-github').Strategy

require('dotenv').config()

const githubOptions = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.CALLBACK_URL}`
}

console.log('http://localhost:3000/auth/github/callback')
console.log(githubOptions.callbackURL)

module.exports = new GithubStrategy(githubOptions, (accessToken, refreshToken, profile, cb) => {
  // user find or create
  // add token to returned profile obj? or save token to db?
  // console.log(accessToken)
  // console.log(profile)
  // console.log(refreshToken)
  return cb(null, profile)
})