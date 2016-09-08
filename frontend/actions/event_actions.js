export const REQUEST_EVENTS = "REQUEST_EVENTS";
export const REQUEST_APPLICATION_EVENTS = "REQUEST_APPLICATION_EVENTS";
export const REQUEST_EVENT = "REQUEST_EVENT";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DESTROY_EVENT = "DESTROY_EVENT";
export const EVENT_ERROR = "EVENT_ERROR";

export const requestEvents = (user_id) => ({
  type: REQUEST_EVENTS,
  user_id
});

export const requestApplicationEvents = (applicationId) => ({
  type: REQUEST_APPLICATION_EVENTS,
  applicationId
});

export const requestEvent = id => ({
  type: REQUEST_EVENT,
  id
});

export const receiveEvents = events => ({
  type: RECEIVE_EVENTS,
  events
});

export const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

export const removeEvent = event => ({
  type: REMOVE_EVENT,
  event
});

export const createEvent = event => ({
  type: CREATE_EVENT,
  event
});

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  event
});

export const destroyEvent = event => ({
  type: DESTROY_EVENT,
  event
});

export const eventError = error => ({
  type: EVENT_ERROR,
  error
});
