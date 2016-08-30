import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ApplicationReducer from './application_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  applications: ApplicationReducer
});

export default RootReducer;
