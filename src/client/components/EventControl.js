import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

class EventControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socketUrl: 'localhost:3000',
      socketMessage: ''
    }
  }


componentDidMount() {
  console.log('mount')
  console.log(this.props.repositories)
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
  let socket = socketIOClient(this.state.socketUrl)
  socket.on('test', (message) => {
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
