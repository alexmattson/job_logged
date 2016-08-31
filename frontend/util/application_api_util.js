export const fetchApplications = function(success){
  $.ajax({
    method: 'GET',
    url: 'api/applications',
    success
  });
};

export const fetchApplication = function(id, success){
  $.ajax({
    method: 'GET',
    url: `api/applications/${id}`,
    success
  });
};

export const createApplication = function(application, success, error){
  $.ajax({
    method: 'POST',
    url: 'api/applications',
    data: application,
    success,
    error
  });
};

export const updateApplication = function(application, success){
  $.ajax({
    method: 'PATCH',
    url: `api/applications/${application.id}`,
    data: {application},
    success
  });
};

export const destroyApplication = function(application, success){
  $.ajax({
    method: 'DELETE',
    url: `api/applications/${application.id}`,
    success
  });
};
