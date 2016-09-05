import { connect } from 'react-redux';
import ApplicationButtonGroup from './application_button_group';
import { logout } from '../../actions/session_actions';
import { destroyApplication,
         updateApplication } from '../../actions/application_actions';
import { createEvent } from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => ({
  applications: state.applications,
  application: state.applications.current,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  destroyApplication: application => dispatch(destroyApplication(application)),
  updateApplication: application => dispatch(updateApplication(application)),
  createEvent: event => dispatch(createEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationButtonGroup);
