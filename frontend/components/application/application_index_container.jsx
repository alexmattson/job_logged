import { connect } from 'react-redux';
import ApplicationIndex from './application_index';
// Actions
import { requestApplications,
         createApplication,
         destroyApplication
       } from '../../actions/application_actions';

const mapStateToProps = state => ({
  applications: state.applications.all
});

const mapDispatchToProps = dispatch => ({
  requestApplications: () => dispatch(requestApplications()),
  createApplication: application => dispatch(createApplication(application))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationIndex);
