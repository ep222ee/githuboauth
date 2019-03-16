'use strict'
const Subscriber = require('../models/SubscriberSchema')
const webpush = require('web-push')
const swController = {}

swController.subscribeSW = async (req, res) => {

  // Setup subscription
  let subscription = req.body.subscription
  let payload = JSON.stringify({
     title: 'Subscribed to push notifications ',
     body: 'Manage which events to receive notifications for in the notification settings'
   })
  webpush.sendNotification(subscription, payload).catch(err => console.log(err))


// Save subscription
  let userID = req.user.id
  let newSubscriber = new Subscriber({
    userID: userID,
    subscription: subscription
  })

  await newSubscriber.save((err, subscriber) => {
    if (err) console.log(err)
  })
  // save subscription to db.
  res.status(201).json({})
}

module.exports = swController
