import { connect } from 'react-redux';
import Contact from './contact';
// Actions
import { updateContact,
         createContact
       } from '../../actions/contact_actions';

const mapStateToProps = state => ({
  errors: state.errors,
  application: state.applications.current,
  contact: state.applications.current.contact
});

const mapDispatchToProps = dispatch => ({
  updateContact: contact => dispatch(updateContact(contact)),
  createContact: contact => dispatch(createContact(contact))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
