export const RECEIVE_CONTACT = "RECEIVE_CONTACT";
export const CREATE_CONTACT = "CREATE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const CONTACT_ERROR = "CONTACT_ERROR";

export const receiveContact = contact => ({
  type: RECEIVE_CONTACT,
  contact
});

export const createContact = contact => ({
  type: CREATE_CONTACT,
  contact
});


export const updateContact = contact => ({
  type: UPDATE_CONTACT,
  contact
});

export const contactError = error => ({
  type: CONTACT_ERROR,
  error
});
