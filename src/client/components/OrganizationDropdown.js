import React, { Component } from 'react'

class OrganizationDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOrganization: ''
    }
  }

  componentDidMount() {
    if (this.props.organizations && this.props.organizations.length >0) {
      this.setState({
        selectedOrganization: this.props.organizations[0].id
      })
    }

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
