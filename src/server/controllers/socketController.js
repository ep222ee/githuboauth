'use strict'

const socketController = {}

socketController.setUserSocketID = (userID, socketID) => {
  console.log('setting user id and socket id..')
  console.log(userID)
  console.log(socketID)
  // save to mongoDB!
}

socketController.removeUserSocketID = (userID, socketID) => {
  console.log('removing user id and socket id..')
  // remove from mongoDB!
}

module.exports = socketController
