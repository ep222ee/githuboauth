import React, { Component } from 'react'
import io from 'socket.io-client'

class EventControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socketUrl: '174.138.15.167',
      socketMessage: ''
    }
  }


componentDidMount() {
  this.hookSetup()
  this.socketConnect()
}

hookSetup () {
 console.log('setupwebhook')
 let request = new XMLHttpRequest()
 let jsonRepositories = JSON.stringify(this.props.repositories)
  request.open('POST', '/api/hookSetup', true) // set true for async
  request.setRequestHeader('Content-type', 'application/json')
  request.send(jsonRepositories)

  request.onload = () => {
      if (request.readyState === 4 && request.status == 200) {
      console.log('hooks done')
    }
  }
}

socketConnect() {
  let socket = io(this.state.socketUrl)
  socket.on('payload', (message) => {
    console.log(message)
    this.setState({socketMessage: message})
  })
}


render () {
  console.log('render')
    return (
      <div>
        <ul>
          <li>
          lista med events
          </li>
        </ul>
      </div>

    )
  }
}


export default EventControl
