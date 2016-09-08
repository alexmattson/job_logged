export const fetchEvents = function(user_id, success){
  $.ajax({
    method: 'GET',
    url: 'api/events',
    data: {user_id},
    success
  });
};

export const fetchApplicationEvents = function(applicationId, success){
  $.ajax({
    method: 'GET',
    url: `api/applications/${applicationId}/events`,
    success
  });
};

export const createEvent = function(event, success, error){
  $.ajax({
    method: 'POST',
    url: `api/applications/${event.application_id}/events`,
    data: {event},
    success,
    error
  });
};

export const updateEvent = function(event, success, error){
  $.ajax({
    method: 'PATCH',
    url: `api/applications/${event.application_id}/events/${event.id}`,
    data: {event},
    success,
    error
  });
};

export const destroyEvent = function(event, success){
  $.ajax({
    method: 'DELETE',
    url: `api/applications/${event.application_id}/events/${event.id}`,
    success
  });
};
