// CoverLetter API Util
import { fetchCoverLetter,
         updateCoverLetter
       } from '../util/cover_letter_api_util';
// CoverLetter Action
import { requestCoverLetter,
         receiveCoverLetter,
// CoverLetter Constants
         REQUEST_COVER_LETTER,
         UPDATE_COVER_LETTER
       } from '../actions/cover_letter_actions';
import { receiveErrors } from '../actions/error_actions';


 export default ({getState, dispatch}) => next => action => {
   const coverLetterSuccess = data => dispatch(receiveCoverLetter(data));
   const coverLetterErrored = data => dispatch(receiveErrors(data));
   switch(action.type){
     case REQUEST_COVER_LETTER:
       fetchCoverLetter(coverLetterSuccess);
       return next(action);
     case UPDATE_COVER_LETTER:
       updateCoverLetter(action.coverLetter, action.id, coverLetterSuccess, coverLetterErrored);
       return next(action);
     default:
       return next(action);
   }
 };
