'use strict'
const Webhook = require('../models/WebhookSchema')
const webhookController = {}

webhookController.payloadPost = async (req, res) => {
    let hookRepository = req.body.repository.id
    console.log(req.body.repository)
    let hookSubscribers = await Webhook.find({ repoID: hookRepository }, (err, subscribers) => {
      if (err) {
        console.log(err)
      }
      return subscribers
    })
    console.log(hookSubscribers)
    // get subscribed users socket id's
    // if socket id is connected
    // emit to subscribed users socket id's
    // get users from webhookschema where request repoID = schema repoID
    res.status(200).send('OK')

  }
module.exports = webhookController
