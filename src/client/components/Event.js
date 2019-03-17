import React, { Component } from 'react'

class Event extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <li className={this.props.event.newEvent ? 'newEvent' : false}>
        <div className='eventContainer'>
          <div className='eventLabels'>
            <span className='eventType'>{this.props.event.eventType}</span>
            <span className={this.props.event.action ? 'eventAction' : 'hidden'}>{this.props.event.action}</span>
          </div>
          <div className='eventBody'>
            <p><strong>From:</strong> {this.props.event.actor}</p>
            <p><strong>Date:</strong> {this.props.event.createdAt}</p>
            <p><strong>Repository:</strong> <a href={this.props.event.repoURL}>{this.props.event.repo}</a></p>
          </div>
        </div>
      </li>
    )
  }
}

export default Event
