import { RECEIVE_APPLICATIONS,
         RECEIVE_APPLICATION,
         REMOVE_APPLICATION,
         APPLICATION_ERROR
       } from '../actions/application_actions';
import merge from 'lodash/merge';

const ApplicationsReducer = (state = {}, action) => {
  let newState;
  switch(action.type){
    case RECEIVE_APPLICATIONS:
      return merge({}, state, {all: action.applications});
    case RECEIVE_APPLICATION:
      return merge({}, state, {current: action.application});
    case REMOVE_APPLICATION:
      newState = merge({}, state);
      newState['current'] = {};
      delete newState['all'][action.application.id];
      return newState;
    case APPLICATION_ERROR:
      alert(action.error);
      return state;
    default:
      return state;
  }
};

export default ApplicationsReducer;
