import React, { Component } from 'react'

class OrganizationDropdown extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let userOrganizations = new XMLHttpRequest()
    userOrganizations.open('GET', '/api/userOrganizations', true) // set true for async
    userOrganizations.setRequestHeader('Content-type', 'application/json')

    userOrganizations.onload = () => {
      if (userOrganizations.send().readyState === 4 && userOrganizations.send().status == 200) {
          console.log(JSON.parse(getLoggedInUser.responseText))
      }
    }
    userOrganizations.send()
  }

  render () {
    return (
      <div>
        <select>
          <option value = "test" ></option>
        </select>
      </div>
    )
  }
}


export default OrganizationDropdown
