import { connect } from 'react-redux';
import ApplicationButtonGroup from './application_button_group';
import { logout } from '../../actions/session_actions';
import { destroyApplication,
         updateApplication } from '../../actions/application_actions';

 const mapStateToProps = (state, ownProps) => ({
   application: state.applications.current
 });

const mapDispatchToProps = dispatch => ({
  destroyApplication: application => dispatch(destroyApplication(application)),
  updateApplication: application => dispatch(updateApplication(application))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationButtonGroup);
