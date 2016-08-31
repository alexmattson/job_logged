import { connect } from 'react-redux';
import Home from './home';
import { logout } from '../../actions/session_actions';
import { createApplication,
         updateApplication } from '../../actions/application_actions';

const mapStateToProps = state => ({
  session: state.session,
  applications: state.applications
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  createApplication: application => dispatch(createApplication(application)),
  updateApplication: application => dispatch(updateApplication(application))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
