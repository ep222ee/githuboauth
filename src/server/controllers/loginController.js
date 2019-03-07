'use strict'

const loginController = {}

loginController.logoutPost = (req, res) => {
  req.logout()
  req.session.destroy((error) => {
    res.redirect('/')
  })
}

module.exports = loginController
