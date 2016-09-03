import { RECEIVE_CONTACT,
         CONTACT_ERROR
       } from '../actions/contact_actions';

const ContactsReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_CONTACT:
      const newContact = {[action.contact.id]: action.contact};
      return Object.assign({}, state, newContact);
    case CONTACT_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default ContactsReducer;
