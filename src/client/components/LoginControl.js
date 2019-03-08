import React, { Component } from 'react'

class LoginControl extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const isLoggedIn = this.props.isLoggedIn

    if (isLoggedIn) {
      return (
        <form method ="post" action="/logout">
          <button type="submit">Logout</button>
        </form>
      )
    } else {
      return (
        <a href='/auth/github' >Login With Github</a>
      )
    }
  }
}


export default LoginControl
