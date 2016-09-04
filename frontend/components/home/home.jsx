import React from 'react';
import { withRouter } from 'react-router';
import ApplicationIndexContainer from '../application/application_index_container';
import HomeButtonGroupContiner from './home_button_group_container';
import ApplicationChart from './application_chart';

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
				<ApplicationChart />
				<HomeButtonGroupContiner />
				<div>
					<ApplicationIndexContainer />
				</div>
      </div>
		);
	}

}

export default withRouter(Home);
