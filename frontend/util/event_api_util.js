export const fetchEvents = function(filter, success){
  $.ajax({
    method: 'GET',
    url: 'api/events',
    data: {filter},
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
    url: `api/applications/${event.event.application_id}/events`,
    data: event,
    success,
    error
  });
};

export const updateEvent = function(event, success){
  $.ajax({
    method: 'PATCH',
    url: `api/events/${event.id}`,
    data: {event},
    success
  });
};

export const destroyEvent = function(event, success){
  $.ajax({
    method: 'DELETE',
    url: `api/events/${event.id}`,
    success
  });
};
