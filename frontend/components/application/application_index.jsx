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

  componentDidUpdate(newProps) {
    $('#myTable').DataTable();
  }

  createRoute(id) {
    this.props.router.push(`application/${id}`);
  }

  className(progress) {
    if (progress === 'offer') {
      return 'application-index-item success';
    } else
    if (progress === 'rejected') {
      return 'application-index-item danger';
    } else
    if (progress === 'application') {
      return 'application-index-item';
    } else {
      return 'application-index-item warning';
    }

  }

  render() {
    let propApps = this.props.applications;
    let applications = Object.keys(this.props.applications).map(appId => (
      <tr key={appId}
          onClick={this.createRoute.bind(this, appId)}
          className={this.className(propApps[appId].progress)}>
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
        <table className="table table-striped" id='myTable' >
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
