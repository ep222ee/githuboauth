'use strict'
const webpush = require('web-push')
const Webhook = require('../models/WebhookSchema')
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
  }

  let ghEvent = req.headers['x-github-event']
  if (activeClients.length > 0) {
    // If there are subscribed users with active sockets.
    // Set up socket message object
    let hookPayload
    switch(ghEvent) {
      case 'issues':
        hookPayload = {
          action: req.body.action,
          author: req.body.issue.user.login,
          title: req.body.issue.title,
          created_at: req.body.issue.created_at,
          updated_at: req.body.issue.updated_at,
          userAvatar: req.body.issue.user.avatar_url,
          body: req.body.issue.body
        }
        break
      case 'issue_comment':
        hookPayload = {
          action: req.body.action,
          author: req.body.comment.user.login,
          userAvatar: req.body.comment.user.avatar_url,
          body: req.body.comment.body,
          commentedRepo: req.body.repository.name,
          issueTitle: req.body.issue.title,
          created_at: req.body.comment.created_at,
          updated_at: req.body.comment.updated_at,
        }
        break
      case 'push':
         hookPayload = {
           pusher: req.body.pusher.name,
           committer: req.body.head_commit.committer.name,
           author: req.body.head_commit.author.name,
           message: req.body.head_commit.message,
           pushTime: req.body.head_commit.timestamp,
           repoName: req.body.repository.name
        }
        break
    }
    activeClients.forEach((client) => {
      client.forEach((socket) => {
        let socketID = socket.socketID
         req.app.io.to(socketID).emit('payload', hookPayload)
      })
    })
  }

  let pushSettings = []
  for (let i = 0; i < hookSubscribers.length; i++) {
    let pushSetting = await Setting.find({userID: hookSubscribers[i].userID, repoID: hookRepository, eventType: ghEvent })
      if (pushSetting.length > 0) {
      pushSettings.push(pushSetting[0].userID) // resulting dbquery array is always 0 or 1 in length
    }
  }

  if (pushSettings.length > 0) {
    console.log(pushSettings)
    // setup push payload
    let pushPayload
    switch(ghEvent) {
      case 'issues':
        pushPayload = {
          title: `Issue ${req.body.action} for repo ${req.body.repository.name} by ${req.body.issue.user.login} in organization ${req.body.repository.owner.login} `,
          body: req.body.issue.body,
          icon: req.body.repository.owner.avatar_url
        }
        break
      case 'issue_comment':
        pushPayload = {
          title: `Issue Comment ${req.body.action} for repo ${req.body.repository.name} by ${req.body.issue.user.login} in organization ${req.body.repository.owner.login}`,
          body: req.body.comment.body,
          icon: req.body.repository.owner.avatar_url
        }
        break
      case 'push':
         pushPayload = {
           title: `A Push was performed for repo ${req.body.repository.name} by ${req.body.pusher.name} in organization ${req.body.repository.owner.login}`,
           body: `${req.body.head_commit.message}`,
           icon: req.body.repository.owner.avatar_url
        }
        break
    }
    // get all endpoints to send

  // foreach pushSetting
  // get all subscriptions
  // webpush send payload to subscribers
  //webpush.sendNotification(subscription, payload).catch(err => console.log(err))
  for (let i = 0; i < pushSettings.length; i++) {
    let pushSubscriptions = await Subscriber.find({userID: pushSettings[i]})
    for (let j = 0; j < pushSubscriptions.length; j++) {
      let pushSubscription = pushSubscriptions[j].subscription
      console.log(pushSubscription)
        webpush.sendNotification(pushSubscription, pushPayload).catch((err) => {
          if (err.statusCode === 410 || err.statusCode === 404) {
            Subscriber.deleteOne({subscription: pushSubscription, userID: pushSubscriptions[j].userID})
          }
        })
    }
  }
}

  // payload source expects 200 OK
  res.status(200).send('OK')
}

module.exports = webhookController
