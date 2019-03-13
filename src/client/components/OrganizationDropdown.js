import React, { Component } from 'react'

class OrganizationDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOrganization: ''
    }
  }

  componentDidMount() {
    console.log('drop mount')
    console.log(this.state.selectedOrganization)
    console.log(this.props.organizations[0])
    this.setState({
      selectedOrganization: this.props.organizations[0].id
    })
}

   render () {
     const organizations = this.props.organizations
     let options = organizations.map((org) =>
         <option key={org.id} value={org.id}>{org.name}</option>)
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
