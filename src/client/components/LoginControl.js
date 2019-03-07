import React, { Component } from 'react'

class LoginControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : false
    }
  }

  componentDidMount() {

    let getLoggedInUser = new XMLHttpRequest()
    getLoggedInUser.open('GET', '/api/loggedInUser')
    getLoggedInUser.setRequestHeader('Content-type', 'application/json')
    getLoggedInUser.send()
    getLoggedInUser.onreadystatechange = () => {
      if (getLoggedInUser.readyState === 4 && getLoggedInUser.status == 200) {
        let updatedState = JSON.parse(getLoggedInUser.responseText).isLoggedIn
          this.setState({
            isLoggedIn: JSON.parse(getLoggedInUser.responseText).isLoggedIn
          })
      }
    }
  }

  render () {
    const isLoggedIn = this.state.isLoggedIn
    let logElement

    if (isLoggedIn) {
      logElement =
      <form method ="post" action="/logout">
        <button type="submit">Logout</button>
      </form>
    } else {
      logElement = <a href='/auth/github' >Login With Github</a>
    }

    return (
      <div>
      { logElement }
      </div>
    )
  }
}


export default LoginControl
