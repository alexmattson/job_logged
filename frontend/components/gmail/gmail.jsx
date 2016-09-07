import React from 'react';
import { merge, isEmpty } from 'lodash';
import { handleAuthClick  } from '../../util/gmail_api_util';

class Gmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.updateMessages = this.updateMessages.bind(this);
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

  render() {
    return(
      <div className='gmail'>
        <div id="authorize-div" className='authorize-div'>
          <span>Clicking the button below will pull any emails from your gmail account</span>
          <span>between you and the email listed in this apps contact</span>
          <button id="authorize-button" onClick={
              handleAuthClick(this.props.email, this.updateMessages)
          }>
            Authorize
          </button>
        </div>
        <div id="output">
          {this.formatMessages()}
        </div>
      </div>
    );
  }
}

export default Gmail;
