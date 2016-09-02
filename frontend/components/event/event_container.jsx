import { connect } from 'react-redux';
import Event from './event';
// Actions
import { requestApplicationEvents,
         createEvent,
         updateEvent,
         destroyEvent
       } from '../../actions/event_actions';

const mapStateToProps = state => ({
  events: state.events,
  application: state.applications.current
});

const mapDispatchToProps = dispatch => ({
  requestApplicationEvents: (id) => dispatch(requestApplicationEvents(id)),
  updateEvent: (event) => dispatch(updateEvent(event)),
  createEvent: (event) => dispatch(createEvent(event)),
  destroyEvent: (event) => dispatch(destroyEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
