import React, { Component } from 'react'

class EventControl extends Component {
  constructor(props) {
    super(props)
  }


componentDidMount() {
  this.setupWebHooks()
}

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
      return (
        <div>
          <ol>
            <li>
            lista med events
            </li>
          </ol>
        </div>

      )
    }
  }


export default EventControl
