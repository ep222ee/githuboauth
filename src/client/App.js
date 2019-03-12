import React, { Component } from 'react'
import LoginControl from './components/LoginControl'
import OrganizationDropdown from './components/OrganizationDropdown'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: '',
      avatar_url: '',
      organizations: [],
    }
  }

  componentDidMount() {
    this.getLoggedInUser()
    this.getUserOrganizations()
    this.setupWebhooks()
}

getLoggedInUser () {
  let loggedInUser = new XMLHttpRequest()
  loggedInUser.open('GET', '/api/loggedInUser', true) // set true for async
  loggedInUser.setRequestHeader('Content-type', 'application/json')
  loggedInUser.send()

  loggedInUser.onload = () => {
    if (loggedInUser.readyState === 4 && loggedInUser.status == 200) {
      let data = JSON.parse(loggedInUser.responseText)

        this.setState({
          loggedInUser: data.loggedInUser,
          avatar_url: data.avatar_url
        })

    }
  }
}

getUserOrganizations () {
  let userOrganizations = new XMLHttpRequest()
  userOrganizations.open('GET', '/api/userOrganizations', true) // set true for async
  userOrganizations.setRequestHeader('Content-type', 'application/json')
  userOrganizations.send()

  userOrganizations.onload = () => {
    let data = JSON.parse(userOrganizations.responseText)
    if (userOrganizations.readyState === 4 && userOrganizations.status == 200) {
        this.setState({
          organizations: data.organizations
        })
    }
  }
}

// maybe move to subcomponent
 setupWebhooks () {
   console.log('setupwebhook')
/*  console.log('innan if')
    if (this.state.loggedInUser) {
      console.log('efter if')
    let hookSetup = new XMLHttpRequest()
    hookSetup.open('POST', '/api/hookSetup', true) // set true for async
    hookSetup.setRequestHeader('Content-type', 'application/json')
    hookSetup.send()

    hookSetup.onload = () => {
        if (hookSetup.readyState === 4 && hookSetup.status == 200) {
        console.log('hooks done')
      }
    }
  } */
}

  render () {
    if (this.state.loggedInUser) {
      return (
        <div>
          <OrganizationDropdown organizations={this.state.organizations}/>
          <LoginControl loggedInUser={this.state.loggedInUser}/>
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
