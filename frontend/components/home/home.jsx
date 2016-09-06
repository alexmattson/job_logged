import React from 'react';
import { withRouter } from 'react-router';
import ApplicationIndexContainer from '../application/application_index_container';
import HomeButtonGroupContiner from './home_button_group_container';
import ApplicationChart from './application_chart';

class Home extends React.Component {
	constructor(props){
		super(props);
	}


	render() {
		return (
			<div className='app-content'>
				<ApplicationChart applications={this.props.applications.all}
					 								session={this.props.session}/>
				<HomeButtonGroupContiner />
				<div>
					<ApplicationIndexContainer />
				</div>
      </div>
		);
	}

}

export default withRouter(Home);
