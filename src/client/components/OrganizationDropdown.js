import React, { Component } from 'react'

class OrganizationDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOrganization: ''
    }
  }

   render () {
     const organizations = this.props.organizations
     let options = organizations.map((org) =>
         <option key={org.login} value={org.login}>{org.login}</option>)

    return (
      <div>
        <select value={this.state.selectedOrganization} onChange={(event) => this.setState({
            selectedOrganization: event.target.value
          })}>
          {options}
        </select>
      </div>
    )
  }
}


export default OrganizationDropdown
