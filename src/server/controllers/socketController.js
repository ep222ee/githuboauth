'use strict'
const Socket = require('../models/SocketSchema')
const socketController = {}

socketController.setUserSocketID = async (userID, socketID) => {
  let newSocket = new Socket({
    userID: userID,
    socketID: socketID,
  })

  await newSocket.save((err, socket) => {
    if (err) console.log(err)
  })
}

socketController.removeUserSocketID = async (socketID) => {
  await Socket.findOneAndRemove({ socketID: socketID }, (err) => {
    if (err) console.log(err)
  })
}

module.exports = socketController
