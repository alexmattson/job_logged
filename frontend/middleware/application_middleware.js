// Application API Util
import { fetchApplications,
         fetchApplication,
         createApplication,
         updateApplication,
         destroyApplication
       } from '../util/application_api_util';
// Application Action
import { requestApplications,
         receiveApplication,
         receiveApplications,
         removeApplication,
// Application Constants
         REQUEST_APPLICATIONS,
         REQUEST_APPLICATION,
         CREATE_APPLICATION,
         UPDATE_APPLICATION,
         DESTROY_APPLICATION
       } from '../actions/application_actions';
import { receiveErrors } from '../actions/error_actions';

 export default ({getState, dispatch}) => next => action => {
   const applicationsSuccess = data => dispatch(receiveApplications(data));
   const applicationSuccess = data => dispatch(receiveApplication(data));
   const applicationRemoved = data => dispatch(removeApplication(data));
   const applicationErrored = data => dispatch(receiveErrors(data));
   switch(action.type){
     case REQUEST_APPLICATIONS:
       fetchApplications(applicationsSuccess);
       return next(action);
     case REQUEST_APPLICATION:
       fetchApplication(action.id, applicationSuccess);
       return next(action);
     case CREATE_APPLICATION:
       createApplication(action.application, applicationSuccess, applicationErrored);
       return next(action);
     case UPDATE_APPLICATION:
       updateApplication(action.application, applicationSuccess, applicationErrored)
       return next(action);
     case DESTROY_APPLICATION:
       destroyApplication(action.application, applicationRemoved);
       return next(action);
     default:
       return next(action);
   }
 };
