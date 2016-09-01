import { connect } from 'react-redux';
import Profile from './profile';
import { requestEvents } from '../../actions/event_actions';

const mapStateToProps = state => {
  return ({
    session: state.session,
    events: state.events
  });
};

const mapDispatchToProps = dispatch => ({
  requestEvents: (month) => dispatch(requestEvents(month))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
