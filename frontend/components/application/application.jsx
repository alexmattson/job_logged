import React from 'react';
import { withRouter } from 'react-router';
import { merge, isEmpty } from 'lodash';

import ProgressBar from './progress_bar';
import ApplicationButtonGroupContainer from './application_button_group_container';
import EventContainer from '../event/event_container';
import ContactContainer from '../contact/contact_container';
import GmailContainer from '../gmail/gmail_container';

class ApplicationIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestApplication(this.props.routeParams.id);
    this.props.requestApplicationEvents(this.props.routeParams.id);
  }

  render() {
    return(
      <div className='app-content'>
        <div className='main shadow application-header'>
          <h1>{this.props.application.company}</h1>
          <h3>{this.props.application.job_title}</h3>
        </div>
        <ApplicationButtonGroupContainer application={this.props.application} />
        <div className='modules-container'>
          <ProgressBar progress={this.props.application.progress} />
          <GmailContainer />
          <ContactContainer />
          <EventContainer />
        </div>
      </div>
    );
  }
}

export default ApplicationIndex;
