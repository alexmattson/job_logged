
const ContactsReducer = (state = [], action) => {
  switch(action.type){
    case 'RECEIVE_ERRORS':
      return action.errors.responseJSON;
    default:
      return state;
  }
};

export default ContactsReducer;
