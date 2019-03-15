import React, { Component } from 'react'
import LoginControl from './components/LoginControl'
import EventControl from './components/EventControl'
import OrganizationDropdown from './components/OrganizationDropdown'

import io from 'socket.io-client' // temp

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userState: {},
      isFetchingUserState: false
    }
  }

  componentWillMount() {

  this.getUserLoggedInStatus()
  }

  componentDidMount() {
    this.getLoggedInUserState()
}


getUserLoggedInStatus () {
  let request = new XMLHttpRequest()
  request.open('GET', '/api/isLoggedIn', true) // set true for async
  request.setRequestHeader('Content-type', 'application/json')
  request.send()

  request.onload = () => {
    if (request.readyState === 4 && request.status == 200) {
      let isLoggedIn = JSON.parse(request.responseText)
        this.setState({isLoggedIn: isLoggedIn})
    }
  }
}

getLoggedInUserState () {
  this.setState({isFetchingUserState: true})
  let request = new XMLHttpRequest()
  request.open('GET', '/api/loggedInUserState', true) // set true for async
  request.setRequestHeader('Content-type', 'application/json')
  request.send()

  request.onload = () => {
    if (request.readyState === 4 && request.status == 200) {
      let loggedInUserState = JSON.parse(request.responseText)
        this.setState({userState: loggedInUserState})
        this.setState({isFetchingUserState: false})

    }
  }
}

  render () {
    if (this.state.isLoggedIn && this.state.isFetchingUserState) {
      return (
        <div>
          <LoginControl isLoggedIn={this.state.isLoggedIn}/>
          <p>Hämtar organisationer</p>
        </div>
      )
    } else if (this.state.isLoggedIn) {
      return (
        <div>
          <OrganizationDropdown organizations={this.state.userState.organizations}/>
          <LoginControl isLoggedIn={this.state.isLoggedIn}/>
          <EventControl repositories= {this.state.userState.repositories}/>
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
