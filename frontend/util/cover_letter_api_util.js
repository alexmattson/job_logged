export const fetchCoverLetter = function(success){
  $.ajax({
    method: 'GET',
    url: 'api/cover_letters',
    success
  });
};

export const updateCoverLetter = function(cover_letter, id, success, error){
  $.ajax({
    method: 'PATCH',
    url: `api/cover_letters/${id}`,
    data: {cover_letter},
    success,
    error
  });
};
