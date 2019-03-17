import React, { Component } from 'react'
import Event from './Event'

class EventList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.events.length > 0) {
      let listElements = this.props.events.map((event) =>
        <Event event={event}/>
      )
      return(
        <div>
          <ol className='eventList'>
            {listElements}
          </ol>
        </div>
      )

    } else {
      return(
        <div><p>There are no events for this organization</p></div>
      )
    }
  }
}

export default EventList
