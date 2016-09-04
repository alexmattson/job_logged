import React from 'react';
import { withRouter, routePrams } from 'react-router';
import merge from 'lodash/merge';

import DatePicker from 'react-datepicker';
import moment from 'moment';

class UpdateForm extends React.Component {
	constructor(props){
		super(props);
    this.state = {
			applicationId: '',
			progress: '',
			title: '',
			time: '12:00',
			startDate: moment(),
			other: false,
			choseCompany: false,
			singleApp: false
    };

		// Generate Form Inputs
    this.update = this.update.bind(this);
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);

		// Handle buttons
		this.handleSubmit = this.handleSubmit.bind(this);
		this._handleBack = this._handleBack.bind(this);
		this._previousActionButton = this._previousActionButton.bind(this);
		this._nextActionButton = this._nextActionButton.bind(this);

		// Formatting
		this._inputFields = this._inputFields.bind(this);
		this._formatAppOptions = this._formatAppOptions.bind(this);

		// Date Picker
		this.handleChange = this.handleChange.bind(this);
		this._datePicker = this._datePicker.bind(this);
	}

	componentDidMount() {
	}

	componentDidUpdate() {

		// Open and close form
		let updateButton = document.getElementById("update");
		if (this.props.update) {
			updateButton.style.height = "50px";
			if (this.state.choseCompany) {
				document.getElementById("updateForm").style.height = "315px";
			} else {
				document.getElementById("updateForm").style.height = "150px";
			}
		} else {
			if (updateButton) {
				updateButton.style.height = "40px";
				document.getElementById("updateForm").style.height = "0px";
			}
		}

		// Setup Dropdown
		if (this.props.applications) {
			$( "#dropdown" ).select2({
				templateResult: formatApplication
			});

			$( "#dropdown2" ).select2({});
			$("#dropdown2").on("change", (e)=>{
				if (e.target.value === 'other') {
					this.setState({other: true});
				} else if (this.state.other) {
					this.setState({other: false});
				}
			}).bind(this);

			let apps = this.props.applications.all;
			let formatApplication = (app) => {
				if (!app.id) { return app.text; }
				let id = app.id;
				var $app = $(
					'<div class="company">' +
						apps[id].company +
					'</div>' +
					'<div>' +
						apps[id].job_title +
					'</div>'
				);
				return $app;
			};
		}
	}

  _setClass(property) {
    if (this.state[property] === '') {
      return "";
    } else {
      return "input--filled";
    }
  }

  update(field){
    return e => { this.setState({[field]: e.currentTarget.value }); };
  }


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

	_previousActionButton() {
		if (this.state.choseCompany && !this.state.singleApp) {
			return (
				<div className='form-button-back' onClick={this._handleBack}>
					<span>Back</span>
				</div>
			);
		} else { return (<div></div>); }
	}

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
		if (this.state.choseCompany) {
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
		} else {
			return (
				<section className='form-input progress-form'>
					<select className="progress-search"
									id='dropdown' >
					  {this._formatAppOptions()}
					</select>
					<span className='label'>Application</span>
				</section>
			);
		}
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

	_handleBack(e) {
		e.preventDefault();
		this.setState({choseCompany: false});
	}

	handleSubmit(e){
		e.preventDefault();
		if (this.state.choseCompany) {
			// Save Event
			let event = {
				title: this.state.title,
				date_time: new Date(this.state.startDate.format('l') + ' ' + this.state.time).toString(),
				application_id: this.state.applicationId
			};
			this.props.createEvent(event);

			// Update application
			let progress = $( ".progress-search" )[0].value;
			if (progress !== 'other') {
				let apps = this.props.applications;
				let application = apps.all[this.state.applicationId];
				application = merge({}, application, {progress});
				this.props.updateApplication(application);
			}

			// Redirect
			this.props.router.push(`/application/${this.state.applicationId}`);
		} else {
			let applicationId = $( ".progress-search" )[0].value;
			$( ".select2-container" ).remove();
			this.setState({
				choseCompany: true,
				applicationId
			});
		}
	}

	humanize(str) {
	  let frags = str.split('_');
	  for (let i=0; i < frags.length; i++) {
	    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	  }
	  return frags.join(' ');
	}

	render() {
		return (
      <div className='form-container form-info' id='updateForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
						{this._previousActionButton()}
						{this._inputFields()}
						{this._nextActionButton()}
          </form>
        </div>
      </div>
		);
	}

}

export default withRouter(UpdateForm);
