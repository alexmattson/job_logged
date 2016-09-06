import { connect } from 'react-redux';
import Header from './header';

const mapStateToProps = state => ({
  applications: state.applications.all
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
