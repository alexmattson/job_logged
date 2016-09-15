import { connect } from 'react-redux';
import CoverLetter from './cover_letter';
// Actions
import { requestCoverLetter,
         updateCoverLetter,
       } from '../../actions/cover_letter_actions';

const mapStateToProps = state =>{
  return ({
    coverLetter: state.cover_letter
  });
};

const mapDispatchToProps = dispatch => ({
  requestCoverLetter: () => dispatch(requestCoverLetter()),
  updateCoverLetter: (coverLetter, id) => dispatch(updateCoverLetter(coverLetter, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoverLetter);
