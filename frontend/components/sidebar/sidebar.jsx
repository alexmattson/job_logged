import React from 'react';
import { Link, hashHistory } from 'react-router';
import { withRouter } from 'react-router';

class SessionForm extends React.Component {
	constructor(props){
		super(props);
    this._logout = this._logout.bind(this);
	}

  _logout() {
    this.props.logout();
		this.props.router.push('/login');
  }

	render() {
		return (
			<div className='sidebar' id='sidebar'>
        <ul>
          <li id='home'>
            <i className="fa fa-home"></i>
            <span>Home</span>
          </li>
          <li id='profile'>
            <i className="fa fa-user"></i>
            <span>Profile</span>
          </li>
          <li>
            <i className="fa fa-sign-out"></i>
            <span onClick={this._logout}>Logout</span>
          </li>
        </ul>
			</div>
		);
	}

}

export default withRouter(SessionForm);
