import React from 'react';
import { withRouter, routePrams } from 'react-router';
import merge from 'lodash/merge';

import DatePicker from 'react-datepicker';
import moment from 'moment';

class UpdateForm extends React.Component {
	constructor(props){
		super(props);
    this.nullState = {
			applicationId: null,
			progress: 'phone',
			title: '',
			time: '12:00',
			startDate: moment(),
			other: false,
			submit: false
    };
		this.state = this.nullState;

		// Generate Form Inputs
    this.update = this.update.bind(this);
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);

		// Handle buttons
		this.handleSubmit = this.handleSubmit.bind(this);
		this._nextActionButton = this._nextActionButton.bind(this);

		// Formatting
		this._inputFields = this._inputFields.bind(this);
		this._formatAppOptions = this._formatAppOptions.bind(this);

		// Date Picker
		this.handleChange = this.handleChange.bind(this);
		this._datePicker = this._datePicker.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (this.state.submit) {
			if (newProps.errors.length < 1){
				$.notify('Application Updated and Event Added', {
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
				let state = merge({}, this.nullState, {
					applicationId: this.state.applicationId
				});
				this.setState(state);
				this.props.toggleParent();
			} else {
				this.setState({submit: false});
			}
		}
	}

	componentDidUpdate(newProps) {

		if (!this.state.applicationId && newProps.application.id) {
			this.setState({
				applicationId: newProps.application.id
			});
		}

		// Open and close form
		let updateButton = document.getElementById("update");
		if (this.props.update) {
			updateButton.style.height = "50px";
			document.getElementById("updateForm").style.height = "315px";
		} else {
			if (updateButton) {
				updateButton.style.height = "40px";
				document.getElementById("updateForm").style.height = "0px";
			}
		}

		// Setup Dropdown
		if (this.props.applications) {
			$( "#dropdown2" ).select2({});
			$("#dropdown2").on("change", ((e)=>{
				this.setState({progress: e.target.value});
			}));
		}
	}

  update(field){
    return e => { this.setState({[field]: e.currentTarget.value }); };
  }

	// Generate Input
  _generateInput(property) {
    return (
      <div className={this._setClass(property)}>
        <input className="input__field input__field--form"
          type={property}
          value={this.state[property]}
          onChange={this.update(property)} />
        <label className="input__label input__label--form"
               htmlFor={property}>
          <span className="input__label-content input__label-content--form">
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

	///

	_nextActionButton() {
		if (this.state.choseCompany) {
			return (
				<div className='form-button' onClick={this.handleSubmit}>
					<span>Submit</span>
				</div>
			);
		} else {
			return (
				<div className='form-button' onClick={this.handleSubmit}>
					<span>Next</span>
				</div>
			);
		}
	}

	// Date Picker

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


	// Time Picker

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

	// Inputs

	_inputFields() {
		return (
			<section className='form-input progress-form'>
				<select className="progress-search"
								id='dropdown2'
								style={ { width: '100%' } }>
					<option value='phone'>
						Phone Interview
					</option>
					<option value='on-site'>
						On-Site Interview
					</option>
					<option value='rejected'>
						Rejected
					</option>
					<option value='offer'>
						Offer
					</option>
					<option value='other'>
						Other
					</option>
				</select>
				<span className='label'>What have you scheduled?</span>

				{this._generateInput('title')}
				{this._datePicker()}
				{this._timePicker()}
			</section>
		);
	}

	_formatAppOptions() {
		let apps = this.props.applications;
		if (apps) {
			apps = Object.keys(apps.all).map(id => {
				return apps.all[id];
			});
			apps = apps.map(app => {
				return (
					<option value={app.id} key={`${app.company}${app.id}`}>
						{app.company} | {app.job_title}
					</option>
				);
			});
		}
		return apps;
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({ submit: true });

		// Try to Save Event
		let event = {
			title: this.state.title,
			date_time: new Date(this.state.startDate.format('l') + ' ' + this.state.time).toString(),
			application_id: this.state.applicationId,
			event_type: this.state.progress
		};
		this.props.createEvent(event);
	}

	render() {
		return (
      <div className='form-container form-info' id='updateForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
						{this._inputFields()}
						{this._nextActionButton()}
          </form>
        </div>
      </div>
		);
	}

}

export default withRouter(UpdateForm);
