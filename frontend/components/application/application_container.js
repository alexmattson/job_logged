import { connect } from 'react-redux';
import Application from './application';
// Actions
import { updateApplication,
         destroyApplication,
         requestApplication,
         requestApplications
       } from '../../actions/application_actions';
import { requestApplicationEvents } from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => ({
  application: state.applications.current,
  applications: state.applications.all
});

const mapDispatchToProps = dispatch => ({
  requestApplications: () => dispatch(requestApplications()),
  requestApplication: id => dispatch(requestApplication(id)),
  requestApplicationEvents: id => dispatch(requestApplicationEvents(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
