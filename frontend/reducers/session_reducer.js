import { SessionConstants } from '../actions/session_actions';
import merge from 'lodash/merge';

const nullUser = {
  currentUser: null,
  errors: []
};

const SessionReducer = function(state = nullUser, action){
  switch(action.type){
    case SessionConstants.RECEIVE_CURRENT_USER:
      return merge({}, nullUser, {currentUser: action.user});
    // case SessionConstants.RECEIVE_ERRORS:
    //   return merge({}, nullUser, {errors: action.errors.responseJSON});
    case SessionConstants.LOGOUT:
      return nullUser;
    default:
      return state;
  }
};

export default SessionReducer;
