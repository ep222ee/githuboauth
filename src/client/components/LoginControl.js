import React, { Component } from 'react'

class LoginControl extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn

    if (isLoggedIn) {
      return (
        <form method ="post" action="/logout">
          <button className='btn btn-primary' type="submit">Sign out</button>
        </form>
      )
    } else {
      return (
        <a className='btn btn-primary' href='/auth/github'>Sign in with GitHub</a>
      )
    }
  }
}

export default LoginControl
