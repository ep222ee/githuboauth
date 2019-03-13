import React, { Component } from 'react'
import LoginControl from './components/LoginControl'
import EventControl from './components/EventControl'
import OrganizationDropdown from './components/OrganizationDropdown'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // separate loggedInStatus from other stateitems
  // get something from db?

  /* componentWillMount() {
     // get users logged in session status?
     // pre first render
  }*/

  componentDidMount() {
    this.getLoggedInUserState()
}

getLoggedInUserState () {
  let request = new XMLHttpRequest()
  request.open('GET', '/api/loggedInUserState', true) // set true for async
  request.setRequestHeader('Content-type', 'application/json')
  request.send()

  request.onload = () => {
    if (request.readyState === 4 && request.status == 200) {
      let loggedInUserState = JSON.parse(request.responseText)
        this.setState(loggedInUserState)

    }
  }
}

  render () {
    if (this.state.loggedInUser) {
      return (
        <div>
          <OrganizationDropdown organizations={this.state.organizations}/>
          <LoginControl loggedInUser={this.state.loggedInUser}/>
          <EventControl repositories= {this.state.repositories}/>
        </div>
      )
    } else {
      return (
        <div>
          <LoginControl loggedInUser={this.state.loggedInUser}/>
        </div>
      )
    }
  }
}

export default App
