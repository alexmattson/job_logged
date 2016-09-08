import React from 'react';
import { merge, isEmpty } from 'lodash';
import { handleAuthClick  } from '../../util/gmail_api_util';

class Gmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.sampleMessages = [
      {
        subject: 'Thank you ',
        snippet: 'We want to reach out to you in order to thank you for applying to our company. Please feel free to reach out to me with any questions you may have about the process.',
        body: 'We want to reach out to you in order to thank you for applying to our company. Please feel free to reach out to me with any questions you may have about the process.'
      },
      {
        subject: 'Schedule a phone Interview',
        snippet: 'Please visit our portal to schedule a phone interview in an avalible time slot. Keep in mind that an interview can take up to 90 minutes so plan accordingly. We look forward to talking to you!',
        body: 'Please visit our portal to schedule a phone interview in an avalible time slot. Keep in mind that an interview can take up to 90 minutes so plan accordingly. We look forward to talking to you!'
      },
      {
        subject: 'Thank you for applying',
        snippet: 'We want to reach out to you in order to thank you for applying to our company. Please feel free to reach out to me with any questions you may have about the process.',
        body: 'We want to reach out to you in order to thank you for applying to our company. Please feel free to reach out to me with any questions you may have about the process.'
      },
    ];

    this.updateMessages = this.updateMessages.bind(this);
    this.setSample = this.setSample.bind(this);
  }

  updateMessages(messages) {
    this.setState({
      messages
    });
  }

  renderEmail(id) {
    return () => {
      document.getElementById(id).classList.toggle("visible");
    };
  }

  createMarkup(html) { return {__html: html}; }

  formatMessages() {
    let emails = this.state.messages.map(message => {
      let id = (Math.random() * 10000);
      return (
        <div key={message.subject}>
          <div className='email row' onClick={this.renderEmail(`email${id}`)}>
            <div className='subject'>
              {message.subject}
            </div>
            <div className='snippet'>
              {message.snippet}
            </div>
          </div>
          <div className='body' id={`email${id}`}
               dangerouslySetInnerHTML={this.createMarkup(message.body)}>
          </div>
        </div>
      );
    });

    return emails;
  }

  setSample() {
    this.updateMessages(this.sampleMessages);
    document.getElementById('authorize-div').style.display = 'none';
  }

  render() {
    return(
      <div className='gmail'>
        <div id="authorize-div" className='authorize-div'>
          <span>Clicking the button below will pull any emails from your gmail account</span>
          <span>between you and the email listed in this applications contact</span>
          <div className='authorize-buttons'>
            <button id="authorize-button"
              className='btn btn-primary'
              onClick={
                handleAuthClick(this.props.email, this.updateMessages)
              }>
              Authorize
            </button>
            <button
              className='btn btn-success'
              onClick={this.setSample}>
              Demo
            </button>
          </div>
        </div>
        <div id="output">
          {this.formatMessages()}
        </div>
      </div>
    );
  }
}

export default Gmail;
