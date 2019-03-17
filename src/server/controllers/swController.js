'use strict'
const Subscriber = require('../models/SubscriberSchema')
const webpush = require('web-push')
const swController = {}

swController.subscribeSW = async (req, res) => {

  // Setup subscription
  let subscription = req.body.subscription
  let payload = JSON.stringify({
     title: 'Push notifications active ',
     body: 'Manage which events to receive notifications for in the notification settings'
   })

   let payloadG = JSON.stringify({
      title: 'greger! ',
      body: 'Manageasgasgasgagsasgasgasg'
    })

  webpush.sendNotification(subscription, payload).catch(err => console.log(err))

  // Check if subscription already exist
  let checkForSubscription = await Subscriber.find({subscription: subscription})

  // Only save subscription if it doesn't exist already
  if (checkForSubscription.length === 0) {

    // Save subscription
    let userID = req.user.id
    let newSubscriber = new Subscriber({
      userID: userID,
      subscription: subscription
    })

    await newSubscriber.save((err, subscriber) => {
      if (err) console.log(err)
    })
  }

  res.status(201).json({})
}

module.exports = swController
