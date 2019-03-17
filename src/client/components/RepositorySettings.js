import React, { Component } from 'react'
import RepositoryEventSetting from './RepositoryEventSetting'

class RepositorySettings extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.getEventSettings()
    this.setSettingCallback = this.setSettingCallback.bind(this)
    this.disableSettingCallback = this.disableSettingCallback.bind(this)
  }


  getEventSettings() {
    let eventSettingTypes = ['issues', 'issue_comment', 'push']
    let eventSettings = []
    // get settings from db based on repositoryID
    let response = fetch(`/settings/repo/${this.props.repository.id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(function(jsonResponse) {
      console.log(jsonResponse)
      for (let i = 0; i < eventSettingTypes.length; i++) {
        let eventType = eventSettingTypes[i]
        let matchingEventTypes = jsonResponse.filter((setting) => {
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
      }
      this.setState({
        eventSettings: eventSettings
      })
    }.bind(this))
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
    if (this.state.eventSettings) {
      let eventSettings = this.state.eventSettings.map((eventSetting) =>
        <RepositoryEventSetting eventSetting = {eventSetting} setSettingCallback={this.setSettingCallback} disableSettingCallback={this.disableSettingCallback}/>
      )
      return (
        <div>
        <h2>{this.props.repository.name}</h2>
        {eventSettings}
        </div>
      )

    } else {
      return null
    }
  }
}

export default RepositorySettings
