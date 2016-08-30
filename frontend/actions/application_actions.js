export const REQUEST_APPLICATIONS = "REQUEST_APPLICATIONS";
export const REQUEST_APPLICATION = "REQUEST_APPLICATION";
export const RECEIVE_APPLICATIONS = "RECEIVE_APPLICATIONS";
export const RECEIVE_APPLICATION = "RECEIVE_APPLICATION";
export const REMOVE_APPLICATION = "REMOVE_APPLICATION";
export const CREATE_APPLICATION = "CREATE_APPLICATION";
export const UPDATE_APPLICATION = "UPDATE_APPLICATION";
export const DESTROY_APPLICATION = "DESTROY_APPLICATION";
export const APPLICATION_ERROR = "APPLICATION_ERROR";

export const requestApplications = () => ({
  type: REQUEST_APPLICATIONS
});

export const requestApplication = id => ({
  type: REQUEST_APPLICATION,
  id
});

export const receiveApplications = applications => ({
  type: RECEIVE_APPLICATIONS,
  applications
});

export const receiveApplication = application => ({
  type: RECEIVE_APPLICATION,
  application
});

export const removeApplication = application => ({
  type: REMOVE_APPLICATION,
  application
});

export const createApplication = application => ({
  type: CREATE_APPLICATION,
  application
});

export const updateApplication = application => ({
  type: UPDATE_APPLICATION,
  application
});

export const destroyApplication = application => ({
  type: DESTROY_APPLICATION,
  application
});

export const applicationError = error => ({
  type: APPLICATION_ERROR,
  error
});
