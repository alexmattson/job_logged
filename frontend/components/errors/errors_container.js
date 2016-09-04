import { connect } from 'react-redux';
import Errors from './errors';
// Actions
import { updateContact,
         createContact
       } from '../../actions/contact_actions';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  // clearErrors: contact => dispatch(clearErrors(contact))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Errors);
