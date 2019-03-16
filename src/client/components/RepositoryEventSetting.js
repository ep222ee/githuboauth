import React, { Component } from 'react'

class RepositoryEventSetting extends Component {
  constructor(props) {
    super(props)
  }

  changeSetting(event) {
    if (this.props.eventSetting.disabled) {
      return false
    }
    this.props.disableSettingCallback(this.props.eventSetting.eventType)
    this.props.setSettingCallback(event, this.props.eventSetting.eventID)
  }

  render () {

    let component =
    <label>
      <input type = 'checkbox' value={this.props.eventSetting.eventType} checked={this.props.eventSetting.isSet} onChange={(event) => this.changeSetting(event)}/>
      {this.props.eventSetting.eventType}
    </label>

    return (
      <div>
      {component}
      </div>
    )
  }
}


export default RepositoryEventSetting
