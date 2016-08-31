import React from 'react';
import { withRouter } from 'react-router';

import ProgressBar from './progress_bar';
import ApplicationButtonGroupContainer from './application_button_group_container';

class ApplicationIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestApplication(this.props.routeParams.id);
  }

  render() {
    return(
      <div className='app-content'>
        <div className='main shadow'>
          <h1>{this.props.application.company}</h1>
          <h3>{this.props.application.job_title}</h3>
        </div>
        <ApplicationButtonGroupContainer application={this.props.application} />
        <ProgressBar progress={this.props.application.progress} />
      </div>
    );
  }
}

export default ApplicationIndex;
