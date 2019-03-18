import React, { Component } from 'react'
import OrganizationSettings from './OrganizationSettings'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {shouldShow: false}
    this.toggleOptions = this.toggleOptions.bind(this)
  }

  getRepositories() {
    let repositories = []
    if (this.props.organizationsSettings[this.props.selectedOrganization]) {
      repositories = this.props.organizationsSettings[this.props.selectedOrganization]
    }
    return repositories
  }

  toggleOptions(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState(state => ({
      shouldShow: !state.shouldShow
    }))
  }

  render () {

    if (this.state.shouldShow) {
      return (
      <div className='settingsDiv'>
        <a href='#' className='btn btn-secondary' onClick={(event) => this.toggleOptions(event)}>Notification Settings</a>
        <OrganizationSettings repositories={this.getRepositories()}/>
      </div>
      )

    } else {
      return (
        <div className='settingsDiv'>
          <a href='#' className='btn btn-secondary' onClick={(event) => this.toggleOptions(event)}>Notification Settings</a>
        </div>
      )
    }
  }
}

export default Settings
