import React from 'react';
import { merge, isEmpty } from 'lodash';

import NewContactForm from './new_contact_form';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newContact: false,
      editContact: false
    };
    this._renderContent = this._renderContent.bind(this);
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


  _renderContent() {
    let contact = this.props.contact;
    if (!isEmpty(contact)) {
      return (
        <div>
          <div className='contact-info'>
            <div className='column'>
              <i className="fa fa-male" aria-hidden="true"></i>
              <i className="fa fa-phone" aria-hidden="true"></i>
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </div>

            <div className='column'>
              <span>{contact.fname} {contact.lname}</span>
              <span>{contact.phone}</span>
              <span>{contact.email}</span>
              <span>{contact.address}</span>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div>
          <NewContactForm newContact={this.state.newContact}
            createContact={this.props.createContact}
            applicationId={this.props.application.id}
            toggleParent={this._toggle('newContact')}/>
          <button className="btn btn-info btn-contact"
            id='newContact'
            onClick={this._toggle('newContact')}>
            New Contact
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
