'use strict'

// Requires
const mongoose = require('./config/mongoose.js')
const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const githubStrategy = require('./passport/githubStrategy')
const helmet = require('helmet')
require('dotenv').config()

const port = 3000

// Security settings
app.disable('x-powered-by')
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"]
  }
}))
app.use(helmet.frameguard({
  action: 'deny'
}))

// Establish db connection
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
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  }
}))

// Passport setup
app.use(passport.initialize())
passport.use(githubStrategy)
app.use(passport.session())

// Passport session serializing/deserializing.
passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

// Routes.
app.use('/', require('./routes/apiRouter.js'))
app.use('/', require('./routes/loginRouter.js'))

// Oauth Routes
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user', 'admin:repo', 'admin:org', 'read:org', 'admin:repo_hook'] }))

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  })

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
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
  console.log(`Express Dev server started on http://localhost:${port}`)
  httpsServer.listen(port)
}
