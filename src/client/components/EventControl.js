import React, { Component } from 'react'

class EventControl extends Component {
  constructor(props) {
    super(props)
  }


componentDidMount() {
  console.log('mount')
  console.log(this.props.repositories)
  this.hookSetup()
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
