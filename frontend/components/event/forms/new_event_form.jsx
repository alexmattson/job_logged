import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

import DatePicker from 'react-datepicker';
import moment from 'moment';

class NewEventForm extends React.Component {
	constructor(props){
		super(props);
    this.nullState = {
      title: '',
			notes: '',
			progress: 'phone',
			time: '12:00',
			startDate: moment(),
			submit: false,
			other: false
    };
		this.state = this.nullState;

    this.update = this.update.bind(this);
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (this.state.submit) {
			if (newProps.errors.length < 1){
				$.notify('Event Added', {
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

  componentDidUpdate() {
    let newEventButton = document.getElementById("newEvent");
    if (this.props.newEvent) {
      document.getElementById("newEventForm").style.height = "350px";
    } else {
      if (newEventButton) {
        document.getElementById("newEventForm").style.height = "0px";
      }
    }

		// Setup Dropdown
		if (this.props.applicationId) {
			$( "#newEventDropdown" ).select2({
				dropdownCssClass: "event-dropdown"
			});
			$("#newEventDropdown").on("change", ((e)=>{
				this.setState({progress: e.target.value});
			}));
		}
  }

	// Generate Inputs //
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
	/////

	_typePicker() {
		return (
			<div>
				<select className="progress-search"
					id='newEventDropdown'
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
		let event = {
			title: this.state.title,
			date_time: new Date(this.state.startDate.format('l') + ' ' + this.state.time).toString(),
			notes: this.state.notes,
			application_id: this.props.applicationId,
			event_type: this.state.progress
		};
		this.props.createEvent(event);
	}

	render() {
		return (
      <div className='form-container form-default form-left' id='newEventForm'>
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

export default withRouter(NewEventForm);
