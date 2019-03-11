'use strict'

// Requires
const passport = require('passport')
const router = require('express').Router()
const controller = require('../controllers/loginController')

let githubOauth = passport.authenticate('github', { scope: ['user', 'admin:repo', 'admin:org', 'read:org', 'admin:repo_hook'] }) // login
let githubCallback = passport.authenticate('github', { failureRedirect: '/' } )

router.get('/auth/github', githubOauth) // redirect till github för login

router.get('/auth/github/callback', githubCallback, controller.oauthLogin)

module.exports = router
