import React, { Component } from 'react'
import io from 'socket.io-client'


class EventControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // '174.138.15.167'
      socketUrl: 'localhost:3000', // temp
      socketMessage: ''
    }
  }

componentDidMount() {
  if (this.props.repositories && this.props.repositories.length > 0) {
    this.hookSetup()
  }
  this.socketConnect()
  this.setupNotificationsSW()
}

setupNotificationsSW() {
  console.log('setup sw')
  if ('serviceWorker' in navigator) {
    this.send().catch(err => console.error(err))
  }
}

async send() {
  let vapidPublicKey = 'BMx-gNAsZkgljx9P3rz9vepkQ2eErW6qzV5y4e3tx-YoCN7VRqZY9_5m-1aPuCuY92hLCn-tD_QYAnTRVazCxpg'
  let reg = await navigator.serviceWorker.register('./sw.js', {
    scope: '/'
  })
  await navigator.serviceWorker.ready
  let subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
  })
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify({subscription}),
    headers: {
      'content-type': 'application/json'
    }
  })
}

// thanks to https://github.com/web-push-libs/web-push
urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async hookSetup () {
  let jsonRepositories = JSON.stringify(this.props.repositories)
  await fetch('/api/hookSetup', {
    method: 'POST',
    body: jsonRepositories,
    headers: {
      'content-type': 'application/json'
    }
  })
}

socketConnect() {
  let socket = io(this.state.socketUrl)
  socket.on('payload', (message) => {
    console.log(message) // temp
    // setState. update stateArray
    this.setState({socketMessage: message})
  })
}


render () {
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
