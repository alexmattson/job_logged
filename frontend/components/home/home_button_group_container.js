import { connect } from 'react-redux';
import HomeButtonGroup from './home_button_group';
import { logout } from '../../actions/session_actions';
import { createApplication,
         updateApplication } from '../../actions/application_actions';
import { createEvent } from '../../actions/event_actions';

const mapStateToProps = state => ({
  applications: state.applications,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  createApplication: application => dispatch(createApplication(application)),
  updateApplication: application => dispatch(updateApplication(application)),
  createEvent: event => dispatch(createEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeButtonGroup);
