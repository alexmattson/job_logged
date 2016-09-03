// Contact API Util
import { createContact,
         updateContact
       } from '../util/contact_api_util';
// Contact Action
import { receiveContact,
         contactError,
// Contact Constants
         CREATE_CONTACT,
         UPDATE_CONTACT
       } from '../actions/contact_actions';

 export default ({getState, dispatch}) => next => action => {
   const contactSuccess = data => dispatch(receiveContact(data));
   const contactErrored = data => dispatch(contactError(data.responseJSON));
   switch(action.type){
     case CREATE_CONTACT:
       createContact(action.contact, contactSuccess, contactErrored);
       return next(action);
     case UPDATE_CONTACT:
       updateContact(action.contact, contactSuccess);
       return next(action);
     default:
       return next(action);
   }
 };
