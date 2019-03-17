import React, { Component } from 'react'

class OrganizationDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOrganization: ''
    }
  }

  componentDidMount() {
    if (this.props.organizations && this.props.organizations.length > 0) {
      // set default selected organization
      this.props.setOrganization(this.props.organizations[0].id)
      this.setState({
         selectedOrganization: this.props.organizations[0].id
      })
    }
  }

  // Eventhandler for organization select onChange events.
  handleChange(event) {
    // set selected value and update state
    let organizationID = Number(event.target.value)
    this.props.setOrganization(organizationID)
    this.setState({
      selectedOrganization: organizationID
    })
  }

 render () {
   const organizations = this.props.organizations
   let options
   if (organizations && organizations.length > 0) {
     options = organizations.map((org) =>
         <option key={org.id} value={org.id}>{org.name}</option>)
     } else {
     options = <option key={'no org'} value={'no org'}>You have no organizations</option>
     }
    return (
      <div>
        <select value={this.state.selectedOrganization} onChange={(event) => this.handleChange(event)}>
          {options}
        </select>
      </div>
    )
  }
}

export default OrganizationDropdown
