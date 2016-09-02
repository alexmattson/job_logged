import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class NewEventForm extends React.Component {
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
			notes: this.props.event.notes,
			time: `${hour}:${min}`,
			startDate: moment(`${mm}/${dd}/${yyyy}`, 'MM-DD-YYYY')
		});
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

  componentDidUpdate() {
    let editEventButton = document.getElementById(
			`editEvent${this.props.event.id}`
		);
    if (this.props.editEvent) {
      document.getElementById(
				`editEvent${this.props.event.id}Form`
			).style.height = "300px";
    } else {
      if (editEventButton) {
        document.getElementById(
					`editEvent${this.props.event.id}Form`
				).style.height = "0px";
      }
    }
  }

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

	handleSubmit(e){
		e.preventDefault();
		let event = {
			id: this.props.event.id,
			title: this.state.title,
			date_time: this.state.startDate.format('l') + ' ' + this.state.time,
			notes: this.state.notes,
			application_id: this.props.applicationId
		};
		this.props.updateEvent(event);
		this.props.toggleParent();
	}

	humanize(str) {
	  let frags = str.split('_');
	  for (let i=0; i<frags.length; i++) {
	    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	  }
	  return frags.join(' ');
	}

	render() {
		return (
      <div className='form-container form-default form-left'
           id={`editEvent${this.props.event.id}Form`}>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
						<section className='form-input'>
              {this._generateInput('title')}
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
