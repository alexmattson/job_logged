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
      return action.applications;
    case RECEIVE_APPLICATION:
      const newApplication = {[action.application.id]: action.application};
      return Object.assign({}, state, newApplication);
    case REMOVE_APPLICATION:
      newState = Object.assign({}, state);
      delete newState[action.application.id];
      return newState;
    case APPLICATION_ERROR:
      alert(action.error);
      return state;
    default:
      return state;
  }
};

export default ApplicationsReducer;
