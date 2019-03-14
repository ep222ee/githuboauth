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
const socket = require('socket.io')
require('dotenv').config()

const port = 3000

// Security settings
app.disable('x-powered-by')

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    connectSrc : ["'self'", `${process.env.WSS_URL}`, `${process.env.WS_URL}`]
    // imgSrc : ["'self'", `github..`]
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
    secure: false, // true when using ssl that's not self signed.
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
app.use('/', require('./routes/oauthRouter.js'))
app.use('/', require('./routes/webhookRouter.js'))


let server

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
  server = app.listen(port, () => {
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
  server = httpsServer.listen(port)
}

let io = socket(server)

io.on('connection', (socket) => {
  console.log('socket connected')
  console.log(socket.id)
  io.emit('test', 'hej klienten')
})

console.log(io)
