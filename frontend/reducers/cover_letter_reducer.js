import { RECEIVE_COVER_LETTER,
         COVER_LETTER_ERROR
       } from '../actions/cover_letter_actions';

const CoverLettersReducer = (state = {}, action) => {
  let newState;
  switch(action.type){
    case RECEIVE_COVER_LETTER:
      const newCoverLetter = {
        id: action.coverLetter.id,
        letter_state: JSON.parse(action.coverLetter.cover_letter)
      };
      return Object.assign({}, state, newCoverLetter);
    case COVER_LETTER_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default CoverLettersReducer;
