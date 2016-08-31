import React from 'react';
import { Link, hashHistory } from 'react-router';
import { withRouter } from 'react-router';

class SessionForm extends React.Component {
	constructor(props){
		super(props);
    this.home = this.home.bind(this);
    this.logout = this.logout.bind(this);
	}

	home() {
		this.props.router.push('/');
	}

  logout() {
    this.props.logout();
		this.props.router.push('/login');
  }

	render() {
		return (
			<div className='sidebar' id='sidebar'>
        <ul>
          <li id='home'>
            <i className="fa fa-home"></i>
            <span onClick={this.home}>Home</span>
          </li>
          <li id='profile'>
            <i className="fa fa-user"></i>
            <span>Profile</span>
          </li>
          <li>
            <i className="fa fa-sign-out"></i>
            <span onClick={this.logout}>Logout</span>
          </li>
        </ul>
			</div>
		);
	}

}

export default withRouter(SessionForm);
