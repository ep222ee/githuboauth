import React, { Component } from 'react'
import LoginControl from './components/LoginControl'
import EventControl from './components/EventControl'
import OrganizationDropdown from './components/OrganizationDropdown'
import Settings from './components/Settings'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userState: {},
      isFetchingUserState: false,
      selectedOrganization: ''
    }
    this.setOrganization = this.setOrganization.bind(this)
  }

  componentWillMount() {
    this.getUserLoggedInStatus()
  }

  async componentDidMount() {
    await this.getLoggedInUserState()
  }

  async getUserLoggedInStatus () {
    let response = await fetch('/api/isLoggedIn', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    let isLoggedIn = await response.json()
    this.setState({isLoggedIn: isLoggedIn})
  }

  async getLoggedInUserState () {
    this.setState({isFetchingUserState: true})
    let response = await fetch('/api/loggedInUserState', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    let loggedInUserState = await response.json()
    this.setState({
      userState: loggedInUserState,
      isFetchingUserState: false
    })
  }

  setOrganization (organization) {
    this.setState({
      selectedOrganization: organization
    })
  }

  getOrganizationSettings () {
    let organizations = {}
    this.state.userState.organizations.forEach((organization) => {
      let repos = []
      this.state.userState.repositories.forEach((repo) => {
        if (repo.organization.id === organization.id && repo.isAdmin) {
          repos.push(repo)
        }
      })
      if (repos.length > 0) {
        organizations[organization.id] = repos
      }
    })
    return organizations
  }

  render () {
    let returnValue = []
    returnValue.push(
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Github External Dashboard</a>

        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <LoginControl isLoggedIn={this.state.isLoggedIn}/>
          </li>
        </ul>
      </nav>
    )

    if (this.state.isLoggedIn && this.state.isFetchingUserState) {
      returnValue.push(
        <div class='container-fluid'>
          <div class='row'>
            <main class='col-lg-12'>
              <p>Retreiving organizations</p>
            </main>
          </div>
        </div>
      )
    } else if (this.state.isLoggedIn) {
      returnValue.push(
        <div class='container-fluid'>
          <div class='row'>
            <main class='col-lg-12'>
              <OrganizationDropdown setOrganization = {this.setOrganization} organizations={this.state.userState.organizations} />
              <Settings selectedOrganization={this.state.selectedOrganization} organizationsSettings={this.getOrganizationSettings()}/>
              <EventControl selectedOrganization={this.state.selectedOrganization} repositories={this.state.userState.repositories}/>
            </main>
          </div>
        </div>
      )
    }
    return <span>{returnValue}</span>
  }
}

export default App
