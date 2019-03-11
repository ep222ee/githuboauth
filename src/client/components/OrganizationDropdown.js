import React, { Component } from 'react'

class OrganizationDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organizations: [],
      selectedOrganization: ''
    }
  }

  componentDidMount() {
    console.log('dropdown loaded!') // temp
    let userOrganizations = new XMLHttpRequest()
    userOrganizations.open('GET', '/api/userOrganizations', true) // set true for async
    userOrganizations.setRequestHeader('Content-type', 'application/json')
    userOrganizations.send()

    userOrganizations.onload = () => {
      if (userOrganizations.readyState === 4 && userOrganizations.status == 200) {
          this.setState({
            organizations: JSON.parse(userOrganizations.responseText)
          })
      }
  }
}

  render () {
    let organizations = this.state.organizations
    let options = organizations.map((org) =>
                <option key={org.login} value={org.login}>{org.login}</option>
            )

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
