import React, { Component } from 'react'
import io from 'socket.io-client'


class EventControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // '174.138.15.167'
      socketUrl: '174.138.15.167',
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

  if ('serviceWorker' in navigator) {
    this.send().catch(err => console.log(err))
  }
}

async send() {
  console.log('register sw')
  let vapidPublicKey = 'BMx-gNAsZkgljx9P3rz9vepkQ2eErW6qzV5y4e3tx-YoCN7VRqZY9_5m-1aPuCuY92hLCn-tD_QYAnTRVazCxpg'
  let reg = await navigator.serviceWorker.register('./sw.js', {
    scope: '/'
  })
  console.log('service worker registered.')

  console.log('Register push')
  let subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
  })
  console.log('Push regged')
  console.log('Send push')
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify({subscription}),
    headers: {
      'content-type': 'application/json'
    }
  })
  console.log('push sent')

}

urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

hookSetup () {

 let request = new XMLHttpRequest()
 let jsonRepositories = JSON.stringify(this.props.repositories)
  request.open('POST', '/api/hookSetup', true) // set true for async
  request.setRequestHeader('Content-type', 'application/json')
  request.send(jsonRepositories)

  request.onload = () => {
      if (request.readyState === 4 && request.status == 200) {

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
