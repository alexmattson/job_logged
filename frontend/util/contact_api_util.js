export const createContact = function(contact, success, error){
  $.ajax({
    method: 'POST',
    url: `api/applications/${contact.application_id}/contacts`,
    data: {contact},
    success,
    error
  });
};

export const updateContact = function(contact, success, error){
  $.ajax({
    method: 'PATCH',
    url: `api/applications/${contact.application_id}/contacts/${contact.id}`,
    data: {contact},
    success,
    error
  });
};
