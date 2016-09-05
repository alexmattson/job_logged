import { RECEIVE_APPLICATIONS,
         RECEIVE_APPLICATION,
         REMOVE_APPLICATION,
         APPLICATION_ERROR
       } from '../actions/application_actions';
import { RECEIVE_CONTACT,
        CONTACT_ERROR
      } from '../actions/contact_actions';
import merge from 'lodash/merge';

const ApplicationsReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_APPLICATIONS:
      return merge({}, state, {all: action.applications});
    case RECEIVE_APPLICATION:
      newState['current']['contact'] = {};
      return merge({}, newState, {current: action.application});
    case REMOVE_APPLICATION:
      newState = merge({}, state);
      newState['current'] = {};
      delete newState['all'][action.application.id];
      return newState;
    case APPLICATION_ERROR:
      alert(action.error);
      return state;

    case RECEIVE_CONTACT:
      let id = action.contact.application_id;
      let app = newState['current'];
      app = merge({}, app, {contact: action.contact});
      newState = merge({}, state, {current: app});
      return newState;
    default:
      return state;
  }
};

export default ApplicationsReducer;
