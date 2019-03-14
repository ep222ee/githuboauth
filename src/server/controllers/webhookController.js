'use strict'

const webhookController = {}

webhookController.payloadPost = (req, res) => {
    console.log(req)
    // get users from webhookschema where request repoID = schema repoID
    res.status(200).send('OK')

  }
module.exports = webhookController
