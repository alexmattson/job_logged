import React from 'react';
import merge from 'lodash/merge';
import { withRouter } from 'react-router';

import NewEventFrom from './new_event_form';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.nullState = {
      newEvent: false,
      update: false
    };
    this.state = this.nullState;
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this._toggle = this._toggle.bind(this);
    this._addEventText = this._addEventText.bind(this);
    this._renderEvents = this._renderEvents.bind(this);
    this._sortEvents = this._sortEvents.bind(this);
  }

  _toggle(form) {
    return (() => {
      if (this.state[form]) {
        this.setState(this.nullState);
      } else {
        let newState = merge({}, this.nullState, {[form]: true});
        this.setState(newState);
      }
    }).bind(this);
  }

  _addEventText() {
    if (this.state.newEvent) {
      return ('Close');
    } else {
      return ('Add Event');
    }
  }

  _sortEvents() {
    let unsorted = this.props.events;
    let sorted = [];
    for (let eventId in unsorted) {
      sorted.push([eventId, unsorted[eventId]['date_time']]);
    }
    return sorted.sort(
    function(a, b) {
        return (Date.parse(b[1])) - (Date.parse(a[1]));
    });
  }

  _renderEvents() {
    let events = this.props.events;
    let eventOrder = this._sortEvents();
    let formattedEvents = eventOrder.map(info => {
      let id = info[0];
      let dateTime = new Date(events[id].date_time);
      let month = this.months[dateTime.getMonth()];
      let date = dateTime.getDate();
      let day = this.days[dateTime.getDay()];
      let hour = dateTime.getHours();
      let half = 'am';
      if (hour > 12 ) { hour = (hour % 12); half = 'pm'; }
      let min = dateTime.getMinutes();
      if (min < 10) {
        min = `0${min}`;
      }
      return (
        <div key={id} className='event'>
          <div className='event-info' id={`editEvent` + id}>
            <div className='date'>
              <span>{day}</span>
              <h2>{month} {date}</h2>
              <span>{hour}:{min} {half}</span>
            </div>
            <div className='detail'>
              <div className='title'>{events[id].title}</div>
              <p>{events[id].notes}</p>
            </div>
          </div>

          <button className="btn btn-default btn-event"
                  id={`editEvent` + id}
                  onClick={this._toggle('editEvent')}>
            Edit Event
          </button>
        </div>
      );
    });
    return formattedEvents;
  }

  render() {
    return(
      <div className='event-container'>
        <div className='event-container-header'>
          <h3>Events</h3>
        </div>
        <NewEventFrom newEvent={this.state.newEvent}
                      createEvent={this.props.createEvent}
                      applicationId={this.props.application.id}/>
        <button className="btn btn-warning btn-event"
                id='newEvent'
                onClick={this._toggle('newEvent')}>
          {this._addEventText()}
        </button>
        <div>
          {this._renderEvents()}
        </div>
      </div>
    );
  }
}

export default withRouter(Event);
