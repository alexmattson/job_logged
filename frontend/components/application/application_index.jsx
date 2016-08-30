import React from 'react';

// Components

class ApplicationIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestApplications();
  }

  render() {
    let propApps = this.props.applications;
    let applications = Object.keys(this.props.applications).map(appId => (
      <li key={appId}>{propApps[appId].company}</li>
    ));

    return(
      <ul>
        {applications}
      </ul>
    );
  }
}

export default ApplicationIndex;
