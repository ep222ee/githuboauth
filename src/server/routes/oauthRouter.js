'use strict'

// Requires
const passport = require('passport')
const router = require('express').Router()
const controller = require('../controllers/loginController')

let githubOauth = passport.authenticate('github', { scope: ['user', 'admin:repo', 'admin:org', 'read:org', 'admin:repo_hook'] })
let githubCallback = passport.authenticate('github', { failureRedirect: '/error' } )

router.get('/auth/github', githubOauth)

router.get('/auth/github/callback', githubCallback, controller.oauthLogin)

module.exports = router
