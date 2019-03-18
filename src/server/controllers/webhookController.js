'use strict'
const webpush = require('web-push')
const Webhook = require('../models/WebhookSchema')
const User = require('../models/UserSchema')
const Socket = require('../models/SocketSchema')
const Setting = require('../models/SettingSchema')
const Subscriber = require('../models/SubscriberSchema')

const webhookController = {}

webhookController.payloadPost = async (req, res) => {
  let hookRepository = req.body.repository.id
  // Find all users subscribed to the repository hook.
  let hookSubscribers = await Webhook.find({ repoID: hookRepository })
  // Send to active subscribed user sockets.
  let activeClients = []
  for (let i = 0; i < hookSubscribers.length; i++) {
    // find all active sockets for subscribed users.
    let activeClient = await Socket.find({ userID: hookSubscribers[i].userID })
    activeClients.push(activeClient)
    //om user har activa sockets spara time stamp på user till date.now
  }

  let ghEvent = req.headers['x-github-event']
  if (activeClients.length > 0) {
    // If there are subscribed users with active sockets.
    // Set up socket message payload
    let hookPayload
    switch(ghEvent) {
      case 'issues':
        hookPayload = {
          organizationID: req.body.organization.id,
          actor: req.body.issue.user.login,
          createdAt: req.body.issue.created_at,
          eventType: 'IssuesEvent',
          repo: req.body.repository.full_name,
          repoURL: `https://github.com/${req.body.repository.full_name}`,
          action: req.body.action,
          newEvent: true
        }
        break
      case 'issue_comment':
        hookPayload = {
          organizationID: req.body.organization.id,
          actor: req.body.comment.user.login,
          createdAt: req.body.comment.created_at,
          eventType: 'IssueCommentEvent',
          repo: req.body.repository.full_name,
          repoURL: `https://github.com/${req.body.repository.full_name}`,
          action: req.body.action,
          newEvent: true
        }
        break
      case 'push':
         hookPayload = {
           organizationID: req.body.organization.id,
           actor: req.body.pusher.name,
           createdAt: req.body.head_commit.timestamp,
           eventType: 'PushEvent',
           repo: req.body.repository.full_name,
           repoURL: `https://github.com/${req.body.repository.full_name}`,
           action: 'Push',
           newEvent: true
        }
        break
    }

    for (let i = 0; i < activeClients.length; i++) {
      let client = activeClients[i]
      for (let j = 0; j < client.length; j++) {
        let socket = client[j]
        let userDBobject = await User.find({githubID: socket.userID})
        if (userDBobject && userDBobject.length > 0) {
          await User.findByIdAndUpdate(userDBobject[0]._id, {lastLoggedIn: Date.now()}, (err, data) => {
            if (err) {
              console.log(err)
            }
          })
        }
        let socketID = socket.socketID
         req.app.io.to(socketID).emit('payload', hookPayload)
      }
    }
  }

  let pushSettings = []
  for (let i = 0; i < hookSubscribers.length; i++) {
    let pushSetting = await Setting.find({userID: hookSubscribers[i].userID, repoID: hookRepository, eventType: ghEvent })
      if (pushSetting.length > 0) {
      pushSettings.push(pushSetting[0].userID) // resulting dbquery array is always 0 or 1 in length
    }
  }

  if (pushSettings.length > 0) {
    // setup push payload
    let pushPayload
    switch(ghEvent) {
      case 'issues':
        pushPayload = JSON.stringify({
          title: `Issue ${req.body.action} for repo ${req.body.repository.name} by ${req.body.issue.user.login} in organization ${req.body.repository.owner.login} `,
          body: req.body.issue.body,
          icon: req.body.repository.owner.avatar_url
        })
        break
      case 'issue_comment':
        pushPayload = JSON.stringify({
          title: `Issue Comment ${req.body.action} for repo ${req.body.repository.name} by ${req.body.issue.user.login} in organization ${req.body.repository.owner.login}`,
          body: req.body.comment.body,
          icon: req.body.repository.owner.avatar_url
        })
        break
      case 'push':
         pushPayload = JSON.stringify({
           title: `A Push was performed for repo ${req.body.repository.name} by ${req.body.pusher.name} in organization ${req.body.repository.owner.login}`,
           body: `${req.body.head_commit.message}`,
           icon: req.body.repository.owner.avatar_url
        })
        break
    }
    for (let i = 0; i < pushSettings.length; i++) {
      let pushSubscriptions = await Subscriber.find({userID: pushSettings[i]})
      for (let j = 0; j < pushSubscriptions.length; j++) {
        let pushSubscription = pushSubscriptions[j].subscription
        webpush.sendNotification(pushSubscription, pushPayload).catch((err) => {

          if (err.statusCode === 410 || err.statusCode === 404) {
            // Delete subscription if the endpoint serviceworker is expired.
            Subscriber.deleteOne({subscription: pushSubscription, userID: pushSubscriptions[j].userID}, (err, data) => {
              if (err) {
                console.log(err)
              }
            })
          }
        })
      }
    }
  }
  // payload source expects 200 OK
  res.status(200).send('OK')
}

module.exports = webhookController
