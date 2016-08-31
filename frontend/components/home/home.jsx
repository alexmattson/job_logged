import React from 'react';
import { withRouter } from 'react-router';
import ApplicationIndexContainer from '../application/application_index_container';
import HomeButtonGroup from './home_button_group';

class Home extends React.Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
		document.getElementById("home").className += " current-page";
	}


	render() {
		return (
			<div className='app-content'>
				<div className='main shadow'>
					<h1>Welcome {this.props.session.currentUser.username}</h1>
				</div>
				<HomeButtonGroup />
				<div>
					<ApplicationIndexContainer />
				</div>
      </div>
		);
	}

}

export default withRouter(Home);
