import React, { Component } from 'react'
import RepositoryEventSetting from './RepositoryEventSetting'

class RepositorySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventSettings: this.getEventSettings()
    }
    this.setSettingCallback = this.setSettingCallback.bind(this)
    this.disableSettingCallback = this.disableSettingCallback.bind(this)
  }


  getEventSettings() {
    let eventSettingTypes = ['issues', 'issue_comment', 'push']
    let eventSettings = []

    eventSettingTypes.forEach((eventType) => {
      let matchingEventTypes = this.props.repository.settings.filter((setting) => {
        return setting.eventType === eventType
      })
      if (matchingEventTypes && matchingEventTypes.length > 0) {
        eventSettings.push(matchingEventTypes[0])
      } else {
        eventSettings.push({
          eventType: eventType,
          eventID: '-1',
          isSet: false
        })
      }
    })
    return eventSettings
  }

  setSettingCallback(event, eventID) {
    let eventType = event.target.value
    fetch('/settings', {
      method: 'POST',
      body: JSON.stringify({
        repoID: this.props.repository.id,
        eventType: event.target.value,
        isSet: event.target.checked,
        eventID: eventID
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => this.setSettingState(eventType, res.id))
  }

  setSettingState(eventType, id) {
    let newState = Object.assign({}, this.state)

    newState.eventSettings.forEach((eventSetting) => {
      if (eventSetting.eventType === eventType) {
        eventSetting.isSet = !eventSetting.isSet
        eventSetting.eventID = id
        eventSetting.disabled = false
      }
    })
    this.setState(newState)
  }

  disableSettingCallback(eventType) {
    let newState = Object.assign({}, this.state)

    newState.eventSettings.forEach((eventSetting) => {
      if (eventSetting.eventType === eventType) {
        eventSetting.disabled = true
      }
    })
    this.setState(newState)
  }

  async saveSetting(event, eventID) {
    let id
    await fetch('/settings', {
      method: 'POST',
      body: JSON.stringify({
        repoID: this.props.repository.id,
        eventType: event.target.value,
        isSet: event.target.checked,
        eventID: eventID
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => id = res.id)
    return id // needed to reset a settings id-state for spamprevention
  }

  render() {
    let eventSettings = this.state.eventSettings.map((eventSetting) =>
      <RepositoryEventSetting eventSetting = {eventSetting} setSettingCallback={this.setSettingCallback} disableSettingCallback={this.disableSettingCallback}/>
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
