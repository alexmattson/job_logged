import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

import DatePicker from 'react-datepicker';
import moment from 'moment';

class EditEventForm extends React.Component {
	constructor(props){
		super(props);
		this.state = this._formatEvent();

    this.update = this.update.bind(this);
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	_formatEvent() {
		let date = new Date(this.props.event.date_time);
		let dd = date.getDate();
		let mm = date.getMonth()+1;
		let yyyy = date.getFullYear();
		let hour = date.getHours();
		let min = date.getMinutes();
		if (min < 10) {
			min = `0${min}`;
		}

		return ({
			title: this.props.event.title,
			notes: this.props.event.notes || '',
			progress: this.props.event.event_type,
			time: `${hour}:${min}`,
			startDate: moment(`${mm}/${dd}/${yyyy}`, 'MM-DD-YYYY'),
			submit: false
		});
	}

	componentWillReceiveProps(newProps) {
		if (this.state.submit) {
			this.setState({submit: false});
			if (newProps.errors.length < 1){
				$.notify('Event Updated', {
					position:'bottom left',
					className: 'success'
				});

				// Update application
				let progress = this.state.progress;
				if (progress !== 'other') {
					let application = this.props.application;
					application = merge({}, application, {progress});
					this.props.updateApplication(application);
				}

				// Reset page elements
				this.props.toggleParent();
			}
		}
	}

  componentDidUpdate() {
    let editEventButton = document.getElementById(
			`editEvent${this.props.event.id}`
		);
    if (this.props.editEvent) {
      document.getElementById(
				`editEvent${this.props.event.id}Form`
			).style.height = "350px";
    } else {
      if (editEventButton) {
        document.getElementById(
					`editEvent${this.props.event.id}Form`
				).style.height = "0px";
      }
    }

		// Setup Dropdown
		if (this.props.applicationId) {
			$( `#editEvent${this.props.event.id}Dropdown` ).select2({
				dropdownCssClass: "event-dropdown"
			});
			$( `#editEvent${this.props.event.id}Dropdown` ).on("change", ((e)=>{
				this.setState({progress: e.target.value});
			}));
		}
  }

	// Input generator ///
  _generateInput(property) {
    return (
      <div className={this._setClass(property)}>
        <input className="input__field input__field--form"
          type={property}
          value={this.state[property]}
          onChange={this.update(property)} />
				<label className="input__label input__label--form dark_form"
               htmlFor={property}>
          <span className="input__label-content input__label-content--form dark-font">
            {this.humanize(property)}
          </span>
        </label>
      </div>
    );
  }

	_setClass(property) {
		if (this.state[property] === '') {
			return "";
		} else {
			return "input--filled";
		}
	}

	humanize(str) {
		let frags = str.split('_');
		for (let i=0; i < frags.length; i++) {
			frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
		}
		return frags.join(' ');
	}
	///////

	selected(property){
		if (this.state.progress === property) {
			return true;
		}
		return false;
	}

	_typePicker() {
		return (
			<div>
				<select className="progress-search"
					id={`editEvent${this.props.event.id}Dropdown`}
					style={ { width: '100%' } }
					defaultValue={this.state.progress}>
					<option value='phone' >
						Phone Interview
					</option>
					<option value='on-site' >
						On-Site Interview
					</option>
					<option value='rejected' >
						Rejected
					</option>
					<option value='offer' >
						Offer
					</option>
					<option value='other' >
						Other
					</option>
				</select>
				<span className='label'>Type</span>
			</div>
		);
	}

	_datePicker() {
		return (
			<div>
				<DatePicker selected={this.state.startDate}
					onChange={this.handleChange}
					className='date-picker'/>
				<div className="date-picker-label">
					Date
				</div>
			</div>
		);
	}

	handleChange(date) {
		this.setState({
			startDate: date
		});
	}

	_timePicker() {
		return (
			<div className='time'>
				<input type='time'
							 id='time'
							 className='date-picker-time'
							 value={this.state['time']}
							 onChange={this.update('time')} />
				<label htmlFor='time'>
					 <div className="date-picker-label">
	 					Time
	 				</div>
	 			</label>
	 		</div>
		);
	}

	update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({submit: true});
		debugger
		let contact = {
			id: this.props.application.contact.id,
			lname: this.state.firstName,
			fname: this.state.lastName,
			phone: this.state.phoneNumer,
			email: this.state.email,
			address: this.state.address,
			application_id: this.props.applicationId
		};
		this.props.updateEvent(event);
	}

	render() {
		return (
      <div className='form-container form-default form-left'
           id={`editEvent${this.props.event.id}Form`}>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
						<section className='form-input'>
              {this._generateInput('title')}
							{this._typePicker()}
							{this._datePicker()}
							{this._timePicker()}
							{this._generateInput('notes')}
            </section>
            <div className='form-button' onClick={this.handleSubmit}>
              <span>Submit</span>
            </div>
          </form>
        </div>
      </div>
		);
	}

}

export default withRouter(EditEventForm);
