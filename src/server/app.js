'use strict'

const express = require('express')

const app = express()

const passport = require('passport')
const githubStrategy = require('./passport/githubStrategy')

const port = 3000

app.use(express.static('dist'))

app.use(passport.initialize())
passport.use(githubStrategy)

passport.serializeUser((user, cb) => {
  // console.log(user)
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  // query db
  // console.log(user)
  cb(null, user)
})

app.get('/', function (req, res) {
  res.send('this should not be seen in production')
})

app.get('/auth/github',
  passport.authenticate('github', { scope: ['repo', 'admin:repo_hook'] }))

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  })

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})
