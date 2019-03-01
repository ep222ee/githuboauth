import React, { Component } from 'react'

export default class Link extends Component {
  getOauth (event) {
    event.preventDefault()
    console.log('tjoho')
  }

  render () {
    return (
      <a href='/auth/github' >
        Login With Github
      </a>
    )
  }
}
