'use strict'

// Requires
const mongoose = require('./config/mongoose.js')
const express = require('express')

const sharedsession = require('express-socket.io-session')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const githubStrategy = require('./passport/githubStrategy')
const helmet = require('helmet')
const socket = require('socket.io')
require('dotenv').config()

const session = require('express-session')({
  name: process.env.SESSION_NAME,
  saveUninitialized: true,
  resave: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // true when using ssl that's not self signed.
    maxAge: 1000 * 60 * 60 * 24,
  }
})

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
app.use(session)

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

// push notification service workers
const webpush = require('web-push')
const vapidPublicKey = process.env.VAPID_PUBLIC
const vapidPrivateKey = process.env.VAPID_PRIVATE
webpush.setVapidDetails(process.env.MAIL_TO, vapidPublicKey, vapidPrivateKey)

app.post('/subscribeToPush', (req, res) => {
  let subscription = req.body
  res.status(201).json({})

  let payload = JSON.stringify({ title: 'testar web push'})
  webpush.sendNotification(subscription, payload).catch(err => console.log(err))
})

// Setup Server
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

// Setup Socket
let io = socket(server)
io.use(sharedsession(session))
// Attach to request for controller
app.io = io

io.on('connection', (socket) => {
  io.emit('payload', 'hi client')
  console.log('client connected')
  const controller = require('./controllers/socketController')
  let userID = socket.handshake.session.passport.user.id
  let socketID = (socket.id)
  controller.setUserSocketID(userID, socketID)

  socket.on('disconnect', () => {
    console.log('socket disconnected')
    controller.removeUserSocketID(socketID)
  })
})
