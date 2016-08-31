import React from 'react';
import { withRouter } from 'react-router';

// Components

class ApplicationIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestApplications();
  }

  componentWillReceiveProps(newProps) {
  }

  createRoute(id) {
    this.props.router.push(`application/${id}`);
  }

  render() {
    let propApps = this.props.applications;
    let applications = Object.keys(this.props.applications).map(appId => (
      <tr key={appId}
          onClick={this.createRoute.bind(this, appId)}
          className='application-index-item'>
        <td>{propApps[appId].company}</td>
        <td>{propApps[appId].job_title}</td>
        <td>{propApps[appId].progress}</td>
      </tr>
    ));

    return(
      <div className="table-responsive table-container">
        <div className='table-header'>
          <span>Applications</span>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {applications}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(ApplicationIndex);
