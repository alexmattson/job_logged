import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ErrorReducer from './error_reducer';
import ApplicationReducer from './application_reducer';
import EventReducer from './event_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorReducer,
  applications: ApplicationReducer,
  events: EventReducer
});

export default RootReducer;
