import React from 'react';
import { hashHistory } from 'react-router';

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
				<div className='main shadow profile-main'>
					<div className='left'>
						<h1>{this.props.session.currentUser.username}</h1>
						<p>Your job search had lasted <span>31</span> days</p>
						<div></div>
					</div>
					<div className='right'>
						<div className='row'>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
						</div>
						<div className='row'>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
						</div>
					</div>
				</div>
				<div>

				<div id="calendar" className='calendar'></div>

				</div>
      </div>
		);
	}

}

export default Profile;
