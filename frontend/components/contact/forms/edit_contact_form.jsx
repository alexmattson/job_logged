import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

import DatePicker from 'react-datepicker';
import moment from 'moment';

class EditContactForm extends React.Component {
	constructor(props){
		super(props);
    this.state = this._formatContact();

    this.update = this.update.bind(this);
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	_formatContact() {
		let contact = this.props.application.contact;
		return ({
			firstName: contact.fname || '',
			lastName: contact.lname || '',
			phoneNumber: contact.phone || '',
			email: contact.email || '',
			address: contact.address || '',
			submit: false
		});
	}

	componentWillReceiveProps(newProps) {
		if (this.state.submit) {
			this.setState({submit: false});
			if (newProps.errors.length < 1){
				$.notify('Contact Updated', {
					position:'bottom left',
					className: 'success'
				});

				// Reset page elements
				this.props.toggleParent();
			}
		} else {
			this.state = this._formatContact();
		}
	}

  componentDidUpdate(newProps) {
    let editContactButton = document.getElementById("editContact");
    if (this.props.editContact) {
      document.getElementById("contactInfo").style.height = "0px";
      document.getElementById("contactInfo").style.padding = "0px 20px";
      document.getElementById("editContactForm").style.height = "325px";
    } else {
      if (editContactButton) {
				document.getElementById("contactInfo").style.height = "170px";
				document.getElementById("contactInfo").style.padding = "20px 20px";
        document.getElementById("editContactForm").style.height = "0px";
      }
    }
  }

	// Generate input
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
	////////

	update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({submit: true});
		let contact = {
			id: this.props.application.contact.id,
			fname: this.state.firstName,
			lname: this.state.lastName,
			phone: this.state.phoneNumber,
			email: this.state.email,
			address: this.state.address,
			application_id: this.props.applicationId
		};
		this.props.updateContact(contact);
	}

	render() {
		return (
      <div className='form-container form-default form-left'
					 id='editContactForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
						<section className='form-input'>
              {this._generateInput('firstName')}
              {this._generateInput('lastName')}
              {this._generateInput('phoneNumber')}
              {this._generateInput('email')}
              {this._generateInput('address')}
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

export default withRouter(EditContactForm);
