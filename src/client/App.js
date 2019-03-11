import React, { Component } from 'react'
import LoginControl from './components/LoginControl'
import OrganizationDropdown from './components/OrganizationDropdown'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    let getLoggedInUser = new XMLHttpRequest()
    getLoggedInUser.open('GET', '/api/loggedInUser', true) // set true for async
    getLoggedInUser.setRequestHeader('Content-type', 'application/json')
    getLoggedInUser.send()

    getLoggedInUser.onload = () => {
      if (getLoggedInUser.readyState === 4 && getLoggedInUser.status == 200) {
          this.setState({
            isLoggedIn: JSON.parse(getLoggedInUser.responseText).isLoggedIn
          })
      }
    }


  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <OrganizationDropdown />
          <LoginControl isLoggedIn={this.state.isLoggedIn}/>
        </div>
      )
    } else {
      return (
        <div>
          <LoginControl isLoggedIn={this.state.isLoggedIn}/>
        </div>
      )
      console.log('utloggad app')
    }
  }
}

export default App
