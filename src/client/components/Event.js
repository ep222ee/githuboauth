import React, { Component } from 'react'

class Event extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <li>
        <div className='eventContainer'>
          {this.props.event.actor}
          {this.props.event.createdAt}
          {this.props.event.actorIMG}
          {this.props.event.eventType}
          {this.props.event.repo}
          {this.props.event.repoURL}
        </div>
      </li>
    )
  }
}

export default Event
