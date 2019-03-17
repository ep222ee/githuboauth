'use strict'

const Setting = require('../models/SettingSchema')

const settingsController = {}

settingsController.postSettings = async (req, res) => {
  if(req.body.isSet) {
    // save
    let newSetting = new Setting({
      userID: req.user.id,
      repoID: req.body.repoID,
      eventType: req.body.eventType
    })

    await newSetting.save((err, data) => {
      if (err) {
        console.log(err)
      }
      res.status(200).json({id: data._id})
    })

  } else {
    // delete
    await Setting.findByIdAndDelete(req.body.eventID)
    res.status(200).json({id: '-1'})
  }
}

settingsController.getSettings = async (req, res) => {
  let settingsArr = []
  console.log('get settings')
  let repoSettings = await Setting.find({userID: req.user.id, repoID: req.params.id})

    for (let i = 0; i < repoSettings.length; i++) {
      let setting = repoSettings[i]
      settingsArr.push({
        eventType: setting.eventType,
        eventID: setting._id,
        isSet: true
      })
    }

  console.log(settingsArr)
res.status(200).json(settingsArr)
}

module.exports = settingsController
