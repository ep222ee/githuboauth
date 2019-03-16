import React, { Component } from 'react'
import RepositorySettings from './RepositorySettings'

class OrganizationSettings extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    let html

    if (this.props.repositories.length > 0) {
      html = this.props.repositories.map((repo) =>
          <RepositorySettings repository={repo}/>
        )
    } else {
      html = <p>You don't have permission to add push notifications for any repositories in this organization</p>
    }


    return (
      <div>
        {html}
      </div>
    )
  }
}


export default OrganizationSettings
