import React from 'react';
import { merge, isEmpty } from 'lodash';

import NewContactForm from './forms/new_contact_form';
import EditContactForm from './forms/edit_contact_form';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.nullState = {
      newContact: false,
      editContact: false,
      contactAdded: false
    };
    this.state = this.nullState;

    this._renderContent = this._renderContent.bind(this);
    this._text = this._text.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.application.id) {
      if (this.state.contactAdded) {
        $.notify('Contact Added', {
          position:'bottom left',
          className: 'success'
        });
      }
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

  addContact(){
    this.setState({contactAdded: true});
  }

  _icon(property, symbol){
    if (this.props.contact[property] !== '') {
      return (
        <div>
          <i className={`fa fa-${symbol}`} aria-hidden="true"></i>
        </div>
      );
    }
  }

  _iconName(){
    if (this.props.contact.fname !== '' ||
        this.props.contact.lname !== '') {
      return (
        <div>
          <i className={`fa fa-male`} aria-hidden="true"></i>
        </div>
      );
    }
  }

  _infoFeild(property) {
    if (this.props.contact[property] !== '') {
      return (
        <span>{this.props.contact[property]}</span>
      );
    }
  }

  _infoFeildName() {
    if (this.props.contact.fname !== '' ||
        this.props.contact.lname !== '') {
      return (
        <span>{this.props.contact.fname} {this.props.contact.lname}</span>
      );
    }
  }

  count(){
    let count = 0;
    let contact = this.props.contact;
    Object.keys(contact).forEach(key => {
      if (contact[key] === '') {
        count += 1;
      }
    });
    return count;
  }

  _renderContent() {
    let contact = this.props.contact;
    if (!isEmpty(contact)) {
      return (
        <div>
          <div className='contact-info-container' id='contactInfo'>
            <div className='contact-info'>
              <div className='column left-column'>
                {this._iconName()}
                {this._icon('phone', 'phone')}
                {this._icon('email', 'envelope')}
                {this._icon('address', 'map-marker')}
              </div>

              <div className='column right-column'>
                {this._infoFeildName()}
                {this._infoFeild('phone')}
                {this._infoFeild('email')}
                {this._infoFeild('address')}
              </div>
            </div>
          </div>

          <EditContactForm editContact={this.state.editContact}
                           updateContact={this.props.updateContact}
                           errors={this.props.errors}
                           count={this.count()}
                           application={this.props.application}
                           applicationId={this.props.application.id}
                           toggleParent={this._toggle('editContact')}/>
          <button className="btn btn-default btn-contact"
                  id='editContact'
                  onClick={this._toggle('editContact')}>
            {this._text(`editContact`, 'Edit Contact')}
          </button>

        </div>
      );
    } else {
      return(
        <div>
          <NewContactForm newContact={this.state.newContact}
                          createContact={this.props.createContact}
                          errors={this.props.errors}
                          application={this.props.application}
                          applicationId={this.props.application.id}
                          toggleParent={this.addContact}/>
          <button className="btn btn-info btn-contact"
                  id='newContact'
                  onClick={this._toggle('newContact')}>
            {this._text(`newContact`, 'New Contact')}
          </button>
        </div>
      );
    }
  }

  render() {
    return(
      <div className='contact-container'>
        <div className='contact-header'>
          <h3>Contact Information</h3>
        </div>
        {this._renderContent()}
      </div>
    );
  }
}

export default Contact;
