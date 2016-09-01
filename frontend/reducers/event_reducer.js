import { RECEIVE_EVENTS,
         RECEIVE_EVENT,
         REMOVE_EVENT,
         EVENT_ERROR
       } from '../actions/event_actions';

const EventsReducer = (state = {}, action) => {
  let newState;
  switch(action.type){
    case RECEIVE_EVENTS:
      return action.events;
    case RECEIVE_EVENT:
      const newEvent = {[action.event.id]: action.event};
      return Object.assign({}, state, newEvent);
    case REMOVE_EVENT:
      newState = Object.assign({}, state);
      delete newState[action.event.id];
      return newState;
    case EVENT_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default EventsReducer;
