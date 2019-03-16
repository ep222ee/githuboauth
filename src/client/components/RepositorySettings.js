import React, { Component } from 'react'
import RepositoryEventSetting from './RepositoryEventSetting'

class RepositorySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventSettings: this.getEventSettings()
    }
    this.setSettingCallback = this.setSettingCallback.bind(this)
  }


getEventSettings() {
  let eventSettingTypes = ['issues', 'issue_comment', 'push']
  let eventSettings = []
  eventSettingTypes.forEach((eventType) => {
    eventSettings.push({
      name: eventType,
      isSet: true //this.props.repository.settings.includes(eventType)
    })
  })
  return eventSettings
}

setSettingCallback(event) {
  let newState = Object.assign({}, this.state)

  newState.eventSettings.forEach((eventSetting) => {
    if (eventSetting.name === event.target.value) {
      eventSetting.isSet = !eventSetting.isSet
    }
  })
  this.setState(newState)
  this.saveSetting(event)
}

  saveSetting(event) {
    console.log(this.props.repository.id)
    console.log(event.target.value)
    console.log(event.target.checked)
  }

  render () {

    let eventSettings = this.state.eventSettings.map((eventSetting) =>
      <RepositoryEventSetting eventSetting = {eventSetting} setSettingCallback={this.setSettingCallback}/>
    )

    return (
      <div>
      <h2>{this.props.repository.name}</h2>
      {eventSettings}
      </div>
    )
  }
}


export default RepositorySettings
