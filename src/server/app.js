'use strict'



// Requires
const mongoose = require('./config/mongoose.js')
const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const githubStrategy = require('./passport/githubStrategy')
require('dotenv').config()

const port = 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

mongoose()

// Parse json bodies.
app.use(bodyParser.json())

// Before session to not serve additional sessions with the statics.
app.use(express.static('dist'))

// Session setup, needs to be set up before passport setup.
app.use(session({
  name: process.env.SESSION_NAME,
  saveUninitialized: true,
  resave: false,
  secret: process.env.SESSION_SECRET,
  cookies: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

// Passport setup
app.use(passport.initialize())
passport.use(githubStrategy)
app.use(passport.session())

// Passport session serializing/deserializing.
passport.serializeUser((user, cb) => {
  // user object already built in strategy.
    cb(null, user)
})

passport.deserializeUser((user, cb) => {
  // query db
  // Check db if the user id is corresponding to an actual user.
  // if it does, attach to req.session
  // console.log(user)
  cb(null, user)
})

app.get('/', function (req, res) { // remove this
  res.send('this should not be seen in production')
})

// oauth routes, move to routes?
app.get('/auth/github',
  passport.authenticate('github', { scope: ['repo', 'admin:repo_hook'] }))

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  })

if (process.env.NODE_ENV === 'production') {
  // Https served through reverse proxy in production
  app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}`)
  })
} else if (process.env.NODE_ENV === 'development') {
  // Dev https
  const fs = require('fs')
  const path = require('path')
  const privateKey = fs.readFileSync(path.join(__dirname, './config/sslcerts/key.pem'), 'utf8')
  const cert = fs.readFileSync(path.join(__dirname, './config/sslcerts/cert.pem'), 'utf8')
  const https = require('https')
  let httpsServer = https.createServer({key: privateKey, cert: cert}, app)
  httpsServer.listen(port)
}
