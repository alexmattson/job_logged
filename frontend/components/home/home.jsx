import React from 'react';
import { withRouter } from 'react-router';
import ApplicationIndexContainer from '../application/application_index_container';
import HomeButtonGroupContiner from './home_button_group_container';

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
				<HomeButtonGroupContiner />
				<div>
					<ApplicationIndexContainer />
				</div>
      </div>
		);
	}

}

export default withRouter(Home);
