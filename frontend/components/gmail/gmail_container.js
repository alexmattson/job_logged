import { connect } from 'react-redux';
import Gmail from './gmail';
// Actions
import { updateContact,
         createContact
       } from '../../actions/contact_actions';

const mapStateToProps = state => ({
  errors: state.errors,
  application: state.applications.current,
  email: state.applications.current.contact.email
});

const mapDispatchToProps = dispatch => ({
  updateContact: contact => dispatch(updateContact(contact)),
  createContact: contact => dispatch(createContact(contact))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gmail);
