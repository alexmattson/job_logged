import React from 'react';
import merge from 'lodash/merge';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router';

import NewEventForm from './new_event_form';
import EditEventForm from './edit_event_form';
import DeleteEventForm from './delete_event_form';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.nullState = {
      newEvent: false,
      update: false
    };
    this.state = this.nullState;
    this.eventState = {};

    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this._toggle = this._toggle.bind(this);
    this._text = this._text.bind(this);
    this._renderEvents = this._renderEvents.bind(this);
    this._sortEvents = this._sortEvents.bind(this);
  }

  componentWillReceiveProps(newProps) {
    let events = newProps.events;
    let eventIds = Object.keys(events);
    let eventState = {};
    eventIds.forEach(id => {
      eventState = merge({},
                         eventState,
                         {[`editEvent` + id]: false},
                         {[`deleteEvent` + id]: false});
    });
    this.nullState = merge({}, this.nullState, eventState);
    this.setState(eventState);
  }

  componentDidUpdate() {
    if (!isEmpty(this.props.events)){
      Object.keys(this.props.events).forEach(id => {
        if (this.state[`editEvent${id}`] || this.state[`deleteEvent${id}`]) {
          document.getElementById(
            `event${id}`
          ).style.overflow = "hidden";

          document.getElementById(
            `event${id}`
          ).style['max-height'] = "0px";
        } else {
          document.getElementById(
            `event${id}`
          ).style.overflow = "scroll";

          document.getElementById(
            `event${id}`
          ).style['max-height'] = "100px";
        }
      });
    }
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

  _text(property, defaultText) {
    if (this.state[property]) {
      return ('Close');
    } else {
      return (defaultText);
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
          <div className='event-info' id={`event` + id}>
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
          <EditEventForm event={events[id]}
                         editEvent={this.state[`editEvent${id}`]}
                         applicationId={this.props.application.id}
                         updateEvent={this.props.updateEvent}
                         toggleParent={this._toggle(`editEvent${id}`)} />
          <DeleteEventForm event={events[id]}
                           deleteEvent={this.state[`deleteEvent${id}`]}
                           applicationId={this.props.application.id}
                           destroyEvent={this.props.destroyEvent}
                           toggleParent={this._toggle(`deleteEvent${id}`)} />
          <div className='buttons'>
            <button className="btn btn-default btn-event btn-1-2"
              id={`editEvent` + id}
              onClick={this._toggle(`editEvent${id}`)}>
              {this._text(`editEvent${id}`, 'Edit')}
            </button>
            <button className="btn btn-danger btn-event btn-1-2"
              id={`deleteEvent` + id}
              onClick={this._toggle(`deleteEvent${id}`)}>
              {this._text(`deleteEvent${id}`, 'Delete')}
            </button>
          </div>
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
        <NewEventForm newEvent={this.state.newEvent}
                      createEvent={this.props.createEvent}
                      applicationId={this.props.application.id}
                      toggleParent={this._toggle('newEvent')}/>
        <button className="btn btn-warning btn-event"
                id='newEvent'
                onClick={this._toggle('newEvent')}>
          {this._text('newEvent', 'Add Event')}
        </button>
        <div>
          {this._renderEvents()}
        </div>
      </div>
    );
  }
}

export default withRouter(Event);
