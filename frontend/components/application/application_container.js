import { connect } from 'react-redux';
import Application from './application';
// Actions
import { updateApplication,
         destroyApplication,
         requestApplication
       } from '../../actions/application_actions';
import { requestApplicationEvents } from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => ({
  application: state.applications.current
});

const mapDispatchToProps = dispatch => ({
  requestApplication: id => dispatch(requestApplication(id)),
  requestApplicationEvents: id => dispatch(requestApplicationEvents(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
