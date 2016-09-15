export const REQUEST_COVER_LETTER = "REQUEST_COVER_LETTER";
export const RECEIVE_COVER_LETTER = "RECEIVE_COVER_LETTER";
export const UPDATE_COVER_LETTER = "UPDATE_COVER_LETTER";
export const COVER_LETTER_ERROR = "COVER_LETTER_ERROR";

export const requestCoverLetter = () => ({
  type: REQUEST_COVER_LETTER
});

export const receiveCoverLetter = coverLetter => ({
  type: RECEIVE_COVER_LETTER,
  coverLetter
});

export const updateCoverLetter = (coverLetter, id) => ({
  type: UPDATE_COVER_LETTER,
  coverLetter,
  id
});

export const coverLetterError = error => ({
  type: COVER_LETTER_ERROR,
  error
});
