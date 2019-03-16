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
    console.log(organization)
    this.setState({
      selectedOrganization: organization
    })
  }

  render () {
    if (this.state.isLoggedIn && this.state.isFetchingUserState) {
      return (
        <div>
          <LoginControl isLoggedIn={this.state.isLoggedIn}/>
          <p>Retreiving organisationer</p>
        </div>
      )
    } else if (this.state.isLoggedIn) {
      return (
        <div>
          <OrganizationDropdown setOrganization = {this.setOrganization} organizations={this.state.userState.organizations} />
          <LoginControl isLoggedIn={this.state.isLoggedIn}/>
          <EventControl repositories= {this.state.userState.repositories}/>
          <Settings repositories= {this.state.userState.repositories}/>
        </div>
      )
    } else {
      return (
        <div>
          <LoginControl isLoggedIn={this.state.isLoggedIn}/>
        </div>
      )
    }
  }
}

export default App
