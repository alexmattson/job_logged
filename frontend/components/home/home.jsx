import React from 'react';
import { withRouter } from 'react-router';

class Home extends React.Component {
	constructor(props){
		super(props);
		this._logout = this._logout.bind(this);
		this._redirectToLogIn = this._redirectToLogIn.bind(this);
	}

	_logout() {
    this.props.logout();
		this.props.router.push('/login');
  }

	_redirectToLogIn() {
	}

	render() {
		return (
			<div>
				<h1>Welcome {this.props.session.currentUser.username}</h1>
        <button onClick={this._logout}
								className='btn'>Logout</button>
      </div>
		);
	}

}

export default withRouter(Home);
