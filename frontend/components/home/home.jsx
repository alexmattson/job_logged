import React from 'react';
import { withRouter } from 'react-router';
import ApplicationIndexContainer from '../application/application_index_container';

class Home extends React.Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
		document.getElementById("home").className += " current-page";
	}


	render() {
		return (
			<div className='content'>
				<div className='main rotateInDownRight'>
					<h1>Welcome {this.props.session.currentUser.username}</h1>
				</div>
				<div>
					<ApplicationIndexContainer />
				</div>
      </div>
		);
	}

}

export default withRouter(Home);
