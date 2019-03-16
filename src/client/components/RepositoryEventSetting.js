import React, { Component } from 'react'

class RepositoryEventSetting extends Component {
  constructor(props) {
    super(props)
  }

  render () {

    let component =
    <label>
      <input type = 'checkbox' value={this.props.eventSetting.name} checked={this.props.eventSetting.isSet} onChange={(e) => this.props.setSettingCallback(event)}/>
      {this.props.eventSetting.name}
    </label>

    return (
      <div>
      {component}
      </div>
    )
  }
}


export default RepositoryEventSetting
