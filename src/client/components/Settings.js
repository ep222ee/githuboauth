import React, { Component } from 'react'
import OrganizationSettings from './OrganizationSettings'

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  getRepositories() {
    let repositories = []
    if (this.props.organizationsSettings[this.props.selectedOrganization]) {
      repositories = this.props.organizationsSettings[this.props.selectedOrganization]
    }
    console.log(repositories)
    return repositories
  }

  render () {
    return (
      <div>
      <a href='#' >Notification Settings</a>
      <OrganizationSettings repositories={this.getRepositories()}/>
      </div>
    )
  }
}


export default Settings
