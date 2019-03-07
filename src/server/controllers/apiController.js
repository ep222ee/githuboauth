'use strict'

const apiController = {}

apiController.getLoggedInUser = (req, res) => {
  console.log(req.user)
  let user = {}
  if (req.user) {
    user.isLoggedIn = true
  } else {
    user.isLoggedIn = false
  }
  res.status(200).json(user)
}

module.exports = apiController
