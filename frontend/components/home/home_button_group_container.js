import { connect } from 'react-redux';
import HomeButtonGroup from './home_button_group';
import { logout } from '../../actions/session_actions';
import { createApplication,
         updateApplication } from '../../actions/application_actions';

const mapStateToProps = state => ({
  applications: state.applications
});

const mapDispatchToProps = dispatch => ({
  createApplication: application => dispatch(createApplication(application)),
  updateApplication: application => dispatch(updateApplication(application))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeButtonGroup);
