import React, { Component } from 'react'
import io from 'socket.io-client'
import EventList from './EventList'

class EventControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // '174.138.15.167'
      socketUrl: '174.138.15.167', // temp
      events: []
    }
  }

  async componentWillMount() {
    await this.getEvents()
  }

  componentDidMount() {
    if (this.props.repositories && this.props.repositories.length > 0) {
      this.hookSetup()
    }

    this.socketConnect()
    this.setupNotificationsSW()
  }

  async getEvents() {
    let response = await fetch('/api/events', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    let events = await response.json()
    console.log(events)
    this.setState({
      events: events
    })
  }

  socketConnect() {
    let socket = io(this.state.socketUrl)
    socket.on('payload', (message) => {
      console.log(message) // temp
      // setState. update stateArray
    })
  }

  setupNotificationsSW() {
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

  // method retrieved from https://github.com/web-push-libs/web-push
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

  async hookSetup() {
    let jsonRepositories = JSON.stringify(this.props.repositories)
    await fetch('/api/hookSetup', {
      method: 'POST',
      body: jsonRepositories,
      headers: {
        'content-type': 'application/json'
      }
    })
  }


 getRepositoryEvents() {
   let events = this.state.events.filter((organizationEvents) => {
    return organizationEvents.organizationID === this.props.selectedOrganization
   })
   if (events && events.length > 0) {
     return events[0].events
   }
   return []
 }



  render() {
    let returnValue =
      <EventList events={this.getRepositoryEvents()}/>
    return (
      <div>
        {returnValue}
      </div>
    )
  }
}


export default EventControl
