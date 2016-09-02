import React from 'react';
import { hashHistory } from 'react-router';
import { isEmpty } from 'lodash';

import Header from './header';

class Profile extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let date = new Date();
		let month = date.getMonth();
		this.props.requestEvents({month});
	}

	componentWillReceiveProps(newProps) {
		if (isEmpty(this.props.applications)) {
			this.props.requestApplications();
		}
		if (newProps.events) {
			let date = new Date();
			let d = date.getDate();
			let m = date.getMonth();
			let y = date.getFullYear();
			let events = this.formatEvents(newProps.events);
			let eventClick = this.eventClick;
			$('#calendar').fullCalendar({
				events,
				eventClick
			});
		}
  }

	eventClick(calEvent, jsEvent, view) {
			hashHistory.push(`/application/${calEvent.application_id}`);
	}

	formatEvents(events) {
		let eventKeys = Object.keys(events);
		return eventKeys.map(id => ({
			title: events[id].title,
			start: Date.parse(events[id].date_time),
			allDay: true,
			className: 'palette-Cyan bg',
			application_id: events[id].application_id
		}));
	}

	render() {
		return (
			<div className='app-content'>
				<Header username={this.props.session.currentUser.username}
								applications={this.props.applications}/>
				<div id="calendar" className='calendar'></div>
      </div>
		);
	}

}

export default Profile;
