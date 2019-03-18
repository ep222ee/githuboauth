import React, { Component } from 'react'
import RepositorySettings from './RepositorySettings'

class OrganizationSettings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let renderedElements
    if (this.props.repositories.length > 0) {
      renderedElements = this.props.repositories.map((repo) =>
          <RepositorySettings repository={repo}/>
        )
    } else {
      renderedElements = <p>You don't have permission to add push notifications for any repositories in this organization</p>
    }
    return (
      <div className='organizationSettings'>
        {renderedElements}
      </div>
    )
  }
}

export default OrganizationSettings
