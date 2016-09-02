import { connect } from 'react-redux';
import Profile from './profile';
import { requestEvents } from '../../actions/event_actions';
import { requestApplications } from '../../actions/application_actions';

const mapStateToProps = state => {
  return ({
    applications: state.applications.all,
    session: state.session,
    events: state.events
  });
};

const mapDispatchToProps = dispatch => ({
  requestEvents: (month) => dispatch(requestEvents(month)),
  requestApplications: () => dispatch(requestApplications()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
