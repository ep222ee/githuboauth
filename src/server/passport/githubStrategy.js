'use strict'

const User = require('../models/UserSchema')

const GithubStrategy = require('passport-github').Strategy
require('dotenv').config()

const githubOptions = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.CALLBACK_URL}`
}

module.exports = new GithubStrategy(githubOptions, (accessToken, refreshToken, profile, cb) => {
  User.findOne({githubID: profile.id}, (err, user) => {
    if (!user) {

      let newUser = new User({
        username: profile._json.login,
        githubID: profile._json.id,
        avatar_url: profile._json.avatar_url
      })

      newUser.save((err, user) => {
        if (err) {
          console.log(err)
        }
      })
    }
  })

  let user = {
    id: profile.id,
    accessToken: accessToken
  }
  return cb(null, user)
})
