import { connect } from 'react-redux';
import Event from './event';
// Actions
import { requestApplicationEvents,
         createEvent,
         destroyEvent
       } from '../../actions/event_actions';

const mapStateToProps = state => ({
  events: state.events,
  application: state.applications.current
});

const mapDispatchToProps = dispatch => ({
  requestApplicationEvents: (id) => dispatch(requestApplicationEvents(id)),
  createEvent: (event) => dispatch(createEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
