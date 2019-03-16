'use strict'
const Webhook = require('../models/WebhookSchema')
const Socket = require('../models/SocketSchema')

const webhookController = {}

webhookController.payloadPost = async (req, res) => { // async

  let hookRepository = req.body.repository.id
  let hookSubscribers = await Webhook.find({ repoID: hookRepository })

  // Send to active subscribed user sockets.
  let activeClients = []
  for (let i = 0; i < hookSubscribers.length; i++) { // för varje subscriber
    let activeClient = await Socket.find({ userID: hookSubscribers[i].userID})
    activeClients.push(activeClient)
    }

  if (activeClients.length > 0) {

    // Set up socket message object
    let event = req.headers['x-github-event']
    let payloadData
    switch(event) {
      case 'issues':
        payloadData = {
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
        payloadData = {
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
         payloadData = {
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
         req.app.io.to(socketID).emit('payload', payloadData)
      })
    })
  }

  // foreach hookSubscribers
  // get settings
  // if settings if userSettings for eventtype is true
  // get user subscriptions
  // webpush
  // check subscribed service workers.
  // send serviceWorker notification based on settings
  // payload source expects 200
    res.status(200).send('OK')
  }
module.exports = webhookController
