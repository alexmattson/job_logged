// Event API Util
import { fetchEvents,
         fetchApplicationEvents,
         fetchEvent,
         createEvent,
         updateEvent,
         destroyEvent
       } from '../util/event_api_util';
// Event Action
import { requestEvents,
         receiveEvent,
         receiveEvents,
         removeEvent,
// Event Constants
         REQUEST_EVENTS,
         REQUEST_APPLICATION_EVENTS,
         REQUEST_EVENT,
         CREATE_EVENT,
         UPDATE_EVENT,
         DESTROY_EVENT
       } from '../actions/event_actions';
import { receiveErrors } from '../actions/error_actions';


 export default ({getState, dispatch}) => next => action => {
   const eventsSuccess = data => dispatch(receiveEvents(data));
   const eventSuccess = data => dispatch(receiveEvent(data));
   const eventRemoved = data => dispatch(removeEvent(data));
   const eventErrored = data => dispatch(receiveErrors(data));
   switch(action.type){
     case REQUEST_EVENTS:
       fetchEvents(action.filter, eventsSuccess);
       return next(action);
     case REQUEST_APPLICATION_EVENTS:
       fetchApplicationEvents(action.applicationId, eventsSuccess);
       return next(action);
     case REQUEST_EVENT:
       fetchEvent(action.id, eventSuccess);
       return next(action);
     case CREATE_EVENT:
       createEvent(action.event, eventSuccess, eventErrored);
       return next(action);
     case UPDATE_EVENT:
       updateEvent(action.event, eventSuccess);
       return next(action);
     case DESTROY_EVENT:
       destroyEvent(action.event, eventRemoved);
       return next(action);
     default:
       return next(action);
   }
 };
